---
author: Abdullah Garcia
date: 2020-01-19T12:05:03Z
desc: 
  In this article, we will be reviewing general secure coding best practices and the OWASP Top 10 (2017) security risks, focusing on how they should be approached when coding using Go.
series: golang
image: golang.svg
tags:
  - advanced
  - security
title: "Secure Coding & OWASP Top 10 (2017) in Golang - Part I"
twitter: https://twitter.com/abdullahgarcia
authorImage: https://pbs.twimg.com/profile_images/1099327373177208833/fZLkqyx3_400x400.png
---

# Introduction

First of all, I would like to thank Elliot Forbes for the opportunity to collaborate in this space. My name is Abdullah Garcia. I am an experienced security engineer with over ten years of successful design and delivery of high-quality solutions across a broad range of industry sectors; for the curious ones, you can find more details in LinkedIn. I'm also a neuroscientist focused on Brain-Computer Interfaces (BCIs) for motor neurorehabilitation combining virtual reality, ML, and prosthetics. Finally, in my spare time, I enjoy landscape/urban/street photography (https://abdullahgarcia.myportfolio.com), traveling, cooking/baking, and all sort of sports... among other things.

Right, so, these are the things I would like you to take away with this article:

* Learn general secure coding best practices that are applicable regardless of the coding language you use.
* Understand how to approach the OWASP Top 10 (2017) security risks when coding using Go.

Thanks in advance for your time!

# General Secure Coding Best Practices

Before beginning this section, I would like to emphasize the following: when you code for living, I genuinely think it is your reponsibility to do it as best as possible (within your understanding; may that be in continuous growth by self-motivated learning). This includes owning the security considerations embedded into your coding practices. Remember, whatever you code, reflects your professionalism. Furthermore, your code composes an application which is likely to be used in the real world affecting/impacting people one way or another. Take pride on it!

Let's begin!

The practices involve the following areas:

* Input Validation
* Output Encoding
* Identity and Authentication Management
* Session Management
* Access Control
* Cryptographic Practices
* Error Handling, Logging, and Metrics
* Data Protection
* Communication Security
* System Configuration
* Database Security
* File Management
* Memory Management
* Others

Note that this list is based on the **[OWASP SCP Quick Reference Guide (v2)](https://www.owasp.org/index.php/OWASP_Secure_Coding_Practices_-_Quick_Reference_Guide)**. However, the content you'll find also includes knowledge acquired over the years and highlights some additional points.

## Input Validation

Whenever **input validation** is discussed, **data sanitization** coexists with it. Note that some people use the term **data validation** too; unfortunately, its usage is not consistent and sometimes is equivalent to input validation and some others to data sanitization. Also, I want you to remember that data sanitization is applied differently depending on the domain: e.g. data wiping, data handling, data privacy, etc. In any case, we need to clarify each term and its process and I think the best way to do it is with context and examples.

Right, so, let's consider a website that has a form and within the form there's only an input field for an email address. For the sake of simplicity, we'll assume that an actual person has filled the form and hit the submit button. 

Before going forward, I want you to think about these questions: 
1. Does it matter if the person that filled the form is a regular user or a malicious one? 
2. Or, alternatively, if a script filled the form? 

The answer to both is: no, it doesn't. You should always be prepared for the worst case: all input data is unsafe by default. Interestingly, there's a whole conversation related to my previous statement: known knowns, known unknowns, and unknown unknowns. I won't address it in this article, but if you are interested, please, let me know in the comments section. Keep this in mind and let's continue!

In this domain and context, data sanitization means: remove (or transform) any data (i.e. characters) which purpose is malicious. In other words, you want the data to be safe before validating it. However, you should always consider usability and a practical approach. Given that we are dealing with an email address input field, we can't simply remove data from the input received. Therefore, if the data is unfit, we should halt the data-related process and return a message to the user; the message should remind the user of the characters that can be used (**positive feedback**) and/or, in this case, the [standard syntax](https://tools.ietf.org/html/rfc5322#section-3.4.1) of an email address.

**Remember, data-related processes should always take place on a trusted system (e.g. backend) as they could be disabled/bypassed by a malicious user/script otherwise (e.g. frontend).**

Input example:

```
example<script>alert('Tacos!');</script>@domain.com
```

By reading the input above, we can tell straight away that this is certainly not an email address and also that it is attempting to deliver a script payload via the data. But, this appreciation comes from our visual interpretation. 

From a coding perspective, data sanitization should be implemented by applying the following premise: what is allowed? This is also known as **whitelisting**. This approach is recommended over the premise for **blacklisting**: what isn't allowed? The reason is simple: you have a known finite set of possibilities for what is allowed as opposed to what isn't.

Probably the most efficient way to implement whitelisting in any coding language is using [regex](https://en.wikipedia.org/wiki/Regular_expression).

Golang regex example:

```
package main

import (
	"fmt"
	"regexp"
)

func main() {
	input := "example<script>alert('Injected!');</script>@domain.com"

	re := regexp.MustCompile("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")

	fmt.Printf("Pattern: %v\n", re.String()) // print pattern	
	fmt.Printf("\nEmail: %v :%v\n", input, re.MatchString(input))
}
```

Result(s):

```
Pattern: ^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$

Email: example<script>alert('Injected!');</script>@domain.com :false
```

Right, so, we have seen how regex can be implemented using Golang. 

Is that it for data sanitization? No.

When you deal with real world applications, you will have to capture other type of inputs, depending on your application. Therefore, here are three points to consider:
1. Always perform data [normalization](https://blog.golang.org/normalization) before performing data sanitization; normalization is important because in Unicode, the same character can have many different representations and this can have a negative impact in the data sanitization process.
2. If you are receiving a path (e.g. directory, link, etc.) as an input, [canonicalize](https://golang.org/pkg/path/filepath/#EvalSymlinks) it before performing data sanitization; absolute or relative paths can be used for malicious purposes as they may contain file links such as symbolic (soft) links, hard links, shortcuts, shadows, aliases, and junctions; hence, they should be fully resolved; furthermore, keep in mind your approach and verify it works for the OS(s) intended.
3. The assumption "all input data is unsafe by default" also applies to hidden form fields, URLs, HTTP header content, etc.
4. Be aware that [double encoding](https://owasp.org/www-community/Double_Encoding) or other forms of obfuscation attacks can be attempted against your system and they can be addressed via canonicalization.
5. Check for null bytes: <%00>.
6. Check for new line characters.

Once data sanitization is over, input validation should take place. Input validation, as the term explicitly indicates, makes sure that the data abides to the rules applicable/defined for a type of input. What does this means... If a type of input is linked to a knowledge domain or business rule, then, whatever characteristics are dictated within them should be enforced. This is also true for the rules we define in terms of storage capability or processing purposes: e.g. how many characters are we allowing to be stored for such input.

To understand input validation, let's consider a website that has a form and within the form there's only an input field for **first name**. Again, for the sake of simplicity, we'll make the same assumptions as before in regards to the usage/filling of the form.

Input example:

```
John Alejandro Dumas Patricio O'Neil
```

This is a very interesting example. Technology has been kind enough to connect most of the world and this has a huge impact when we deliver services. Let's begin with the data sanitization angle. Some implementations won't allow the use of <'> as part of a first name. Personally, I think this is failing to account for globalization and connectivity. The user doesn't need to be accessing the website from a foreign country for him/her to have a name that doesn't conform with the "expected" constrains. I encourage you to read this article so you can take the adequate decisions: [Personal Names Around the World](https://www.w3.org/International/questions/qa-personal-names)

That being said, what kind of input validation can take place after data sanitization? Let's assume that we have a constrain of 30 characters space for the first name in our data store. Would this input be valid?

Golang example:

```
package main

import (
	"fmt"
)

func main() {
	input := "John Alejandro Dumas Patricio O'Neil"

	fmt.Printf("First name: %v :%d\n", input, len(input))
}
```

Result(s):

```
First name: John Alejandro Dumas Patricio O'Neil :36
```

From the results above, we can tell it isn't a valid input as it exceeds the maximum amount of characters allowed. Note that the implementation above is a very simple one and that it can also be performed using regex. I think that code should be as simple as possible, but it is up to you how "fancy" you want to implement your approach.

With that being said, there are a few more points for you to consider when it comes to input validation:
1. Whatever input validation functions/methods you implement, make them centrally available; this also applies for data sanitization; the rationale is that you want the same level of standards across your application(s) and team(s).
2. All validation failures should result in input rejection.
3. Validate data type and data range too; ensure there is a boundary check when appropriate.

We have covered both terms now, so, how do they relate to OWASP Top 10? 

Input validation, and data sanitization, are directly related to the following:
- A1: Injection
- A4: XML External Entities (XXE)
- A7: Cross-Site Scripting (XSS)

In the next article, I'll cover those OWASP Top 10 risks after addressing output encoding.

Hopefully you found this tutorial useful, if you did, or if you require further help, then please do not hesitate to let me know in the comments section below!