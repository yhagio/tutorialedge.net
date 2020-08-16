---
title: "Onion Architecture 🧅"
date: 2020-07-17T15:10:000
desc: How to utilise Onion Architecture in your applications.
author: Barry McAuley 
aliases: []
twitter: https://twitter.com/_bmcauley
series: software-engineer
image: https://img.barrymcauley.co.uk/onion.jpg
tags:
- architecture
authorImage: https://img.barrymcauley.co.uk/me.jpg
---

Onions are a delicious vegetable and are a core ingredient in cuisines around the world. Perhaps then you are wondering, why are we discussing them in the context of software engineering? First introduced by [Jeffrey Palermo](https://jeffreypalermo.com/) in a series of blog posts, Onion Architecture guides software engineers to model their business logic in a **core** collection with no coupling to the outer concerns, such as database choice or how the user interface operates.

 What does Onion Architecture look like? It may come as a surprise.

![https://img.barrymcauley.co.uk/onion_architecture.svg](https://img.barrymcauley.co.uk/onion_architecture.svg)

It looks very similar to an onion with layers wrapping around a central core. Each of these layers represent a specific duty within the overall function of a service. Similar to an onion, you can only access the core by going through the outer most layers and it is that narrative which informs us of the architectures purpose - to direct the flow of coupling towards the centre from the outside in. 

So, like a typical onion, let's work our way into the core and hopefully avoid any tears along the way. The three outer layers are those which are not directly related to our business logic but depend upon on it fulfil their own purpose. They can change often and thus are separate from our core application logic. 

These layers are: **Infrastructure**, where our database, file system, or any external web service we depend on live. **Tests:** unit, integration, end-to-end. How we validate our business cases. Finally, **User Interface**, how our users interact with the code we have built. These layers are the ones which interact with the first layer of our **"application core"** and that is the **Application Services** layer (sometimes known as the **Transport Layer**). Within this layer, we define what our service can do through a series of contracts.

Inward moving, we encounter the **Domain Services** layer. In this layer is where the majority of our business logic lives, it carries out the operations to turn A into B, input into output, egg into chicken. It achieves this through interacting with the final layer, the **Domain Model** layer which is the representation of the high level data objects we use. 

Let's walk-through an example on how we can solve a real-world task such as processing a financial transaction to see how we apply the **Onion Architecture.** from the outside, in.

### An Example - Buying A Coffee

One outer layer which may surprise many is **Infrastructure**. Is the database we use or an external dependency not part of our domain model layer? A very valid question so let's explore it further. 

Take for instance we have the following definition of a user account in some NoSQL database:

```json
{
	"id": "some_user_id",
	"balance": 500.00,
	"currency": "GBP",
}
```

So when we do a query and wish to interact with this, it would be common sense that we would create a model object to marshal this json into such as:

```go
type Account struct {
	ID       string    `json:"id"`
	Currency string    `json:"currency"`
	Balance  float64   `json:"balance"`
}
```

Makes sense, right? Lets say however that the team decides that NoSQL isn't up to scratch and some relational goodness is the trend of the month. Well, thanks to the power of the onion architecture, as long as the new relational structure provides the fields required as defined in your domain model **contract**, the business logic of your application does not need to change and you can continue to provide the functionality your users need. This applies to any external dependency or data-storage the application interacts with the key takeaway being:

```
Externalise your dependencies and decouple them through contracts.
```

Now we have a domain model representation of an account, let's need to define a use-case for a financial transaction and the steps involved when our user, Andre, decides to buy a coffee:

![https://img.barrymcauley.co.uk/transaction.svg](https://img.barrymcauley.co.uk/transaction.svg)

As we can see from the diagram, we need to set a contract to allow "Generic Coffee Shop" to charge Andres balance for the cost of the coffee he is purchasing. Let's assume that "Generic Coffee Shop" will communicate with us via a **HTTP POST** request, we can see that we need the following:

- The user ID of Andre.
- The requested amount to buy the coffee.

A **json** representation of this request would be:

```json
{
	"userID": "some_user_id",
	"amount": 100.00,
}
```

The naming of this use-case would be charging a users balance and, as mentioned, the **Applications Services** layer is where we define these. To represent this in code, we will need to embody it within our http handler code:

```go
package application

import (
	"net/http"
	"encoding/json"
)

// ChargeRequest is our representation of an incoming request.
type ChargeRequest struct {
	UserID string  `json:"userID"`
	Amount float64 `json:"amount"`
}

// ChargeUserHandler takes an incoming HTTP POST request and decodes
// the body into a ChargeRequest so that we can carry out charging
// the users balance for the cost of the transaction.
func ChargeUserHandler(w http.ResponseWriter, r *http.Request) {
	var cr ChargeRequest
	
	err := json.NewDecoder(r.Body).Decode(&cr)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if cr.UserID == "" {
		http.Error(w, "user id empty", http.StatusBadRequest)
		return
	}

	// Call our domain services layer

	return
}
```

Great! We have now set our expectations for anyone wishing to charge a user for a transaction within our **Application Services** layer. However, we are not doing anything useful at the moment with the transaction so from this and following the layers of **Onion Architecture** we need to define our **Domain Services** layer. 

As engineers, let's take some time to lay out our flow:

1. Check Andres account balance and if it has enough funds in it to cover the cost of the transaction.
    - If not or there is no account for Andre, return an error stating so.
2. Now we have the account, deduct the cost of the transaction from Andres balance and update it within our database.
    - If the update fails, we need to return an error stating so. We don't want anyone getting a free coffee.
3. Now the balance has been updated, return confirmation to "Generic Coffee Company" thus completing the transaction and allowing Andre to drink his delicious coffee.

Thankfully we have already defined our Account domain model that we can use so encapsulating all of this in code would look something like:

```go
package service

import (
	"database/sql"
	"fmt"
)

// DB interface sets out the operations allowed on our database.
type DB interface {
	StartTransaction() (*sql.Tx, error)
	GetUserAccount(tx *sql.Tx, userID string) (Account, error)
	UpdateUserAccount(tx *sql.Tx, userID string, account Account) error
}

// ChargeService carries out the business logic to charge users balances
type ChargeService struct {
	db DB
}

// ChargeUser takes a user ID and an amount then deducts that amount from the
// balance of that user, if they have enough.
func (cs *ChargeService) ChargeUser(userID string, chargeAmount float64) error {
	transaction, err := cs.db.StartTransaction()
	if err != nil {
		return fmt.Errorf("error starting transaction")
	}
	defer func() {
    	_ = transaction.Rollback()
	}()

	account, err := cs.db.GetUserAccount(transaction, userID)
	if err != nil {
		return err
	}
	if account.Balance < chargeAmount {
		return fmt.Errorf("insufficient funds")
	}

	account.Balance = account.Balance - chargeAmount
	err = cs.db.UpdateUserAccount(transaction, userID, account)
	if err != nil {
		return err
	}

	err = transaction.Commit()
	if err != nil {
		return fmt.Errorf("error committing transaction")
	}

	return nil
}
```

Referring back to the cases above we mapped out above, we can see that we have captured the business logic required within our **Domain Service** layer code and now we can add the function call into our handler:

```go
// ChargeUserHandler takes an incoming HTTP POST request and decodes
// the body into a ChargeRequest so that we can carry out charging
// the users balance for the cost of the transaction.
func ChargeUserHandler(w http.ResponseWriter, r *http.Request) {
	var cr ChargeRequest
	
	err := json.NewDecoder(r.Body).Decode(&cr)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if cr.UserID == "" {
		http.Error(w, "user id empty", http.StatusBadRequest)
		return
	}

	// New code here
	db := DatabaseAdapter{}
	chargeService := service.ChargeService{db: db}
	err := chargeService.ChargeUser(cr.UserID, cr.Amount)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	return
}
```

Now, if we deploy this service, when Andre decides to buy a coffee we can be certain that we will meet the requirements set-out in our investigation and be confident our logic is neatly sorted into layers (assuming we have the appropriate level of testing in place). This is a simple use-case but the real question being asked is why.

### Why use Onion Architecture?

But, what are the benefits of using **Onion Architecture**? 

It is the contracts between each layer we have defined, also known as the **Dependency Inversion Principle**, which the **Onion Architecture** heavily depends on. As long as our layers adhere to the contracts / interfaces set out in our code, we can utilise them as mentioned in our NoSQL or SQL debate. A picture says a thousand words, let's visualise this:

![https://img.barrymcauley.co.uk/contract.svg](https://img.barrymcauley.co.uk/contract.svg)

Using contracts allows each layer to set its expectations onto the next and couples it to ***only*** what it requires to be. In addition, the implementation specifics of each layer can be refactored at any point as long as they meet their contractual obligations with their neighbours making it easier to respond to changes and increasing the testability of our code. 

However, this architecture pattern is not a silver bullet to every problem. As with all software problems, we need to evaluate whether or not we need this additional abstraction as it is more suited for larger applications with many engineers working on them. As engineers we need to apply critical thinking to determine whether or not it will overall benefit the task at hand. Furthermore, the added complexity of defining contracts / interfaces and religiously enforcing them requires a strong understanding of the pattern. If executed well, the benefits will supercharge productivity and greatly increase the flexibility of the applications being developed.

Let me know what you think about Onion Architecture on Twitter and I hope you enjoyed this post. If you like what you see, check me out on my [blog.](https://barrymcauley.co.uk)

Until next time...

BM
