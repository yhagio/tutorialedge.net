---
author: Elliot Forbes
date: 2017-11-30T21:21:51Z
desc:
  In just a few simple steps, we'll be using Terraform to provision our underlying AWS infrastructure and deploy our microservice developed with Go.
series: cloud
image: golang.svg
tags:
  - resiliency
title: How to use Terraform, Go, and AWS to build a scalable and resilient REST API
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

I've recently been exploring the power of Terraform - and wanted to apply what I've learned to build a scalable and resilient REST API. In just a few simple steps, we'll be using Terraform to provision our underlying AWS infrastructure and deploy our microservice developed with Go.
Creating the RESTful API with GO
To get started, let's build and compile a simple codebase using Go. Once we build this microservice, we'll provision an AWS EC2 instance for our execution environment.

```go
package main

import (
    "fmt"
    "log"
    "net/http"
)

func main() {
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "Hello World")
    })

    log.Fatal(http.ListenAndServe(":80", nil))
}
```

> Technically, I guess we can consider this a microservice?

Once the service is built using our Go code, we can construct a Docker image and publish dockerhub - this will make our deployment a breeze.

```Dockerfile
FROM golang:latest
RUN mkdir /app
ADD ./pkg /app/
WORKDIR /app
RUN go get "github.com/gorilla/mux"
RUN go build -o main .
CMD ["/app/main"]
```

Our simple Dockerfile for our go appNow that we've defined both the microservice and our Dockerfile, let's publish our Docker image to a repository. I've deployed this particular image here on docker hub, so feel free to follow along using my image.

# Provisioning an EC2 using Terraform

Terraform is surprisingly easy to get up and running with. When I first started using the CLI, I was able to spin up an EC2 instance in less than 5 minutes.
Using the Terraform configuration files, we'll be specifying the characteristics of our infrastructure -such as the Auto Scaling Groups, the Security Groups, and the Instance Types we wish to run.
For example, the following test.tf configuration file is all you'd need to spin up a vanilla t2.micro instance without auto scaling or security groups.

```js
provider "aws" {
    access_key = "ACCESS_KEY_HERE"
    secret_key = "SECRET_KEY_HERE"
    region = "us-east-1"
}

resource "aws_instance" "example" {
    ami = "ami-2767f631"
    instance_type = "t2.micro"
}

```

After declaring your infrastructure as code in the .tf file, just run the terraform apply command an it'll automatically provision a t2.micro instance in the us-east-1 region.

# The Benefits of Declarative vs. Procedural

One of my favorite features of Terraform is that the files are declarative as opposed to procedural. This effectively means that whatever you have provisioned within your terraform files should accurately reflect the infrastructure that is currently deployed and running.

With a procedural style tools like Chef and Ansible, you write the step-by-step code that specifies how to achieve the desired end state. With declarative style tools such as Terraform and CloudFormation, the code you write not only specifies the desired end state - but the tool is also responsible for achieving that state.

Using provisioning tool like Terraform is advantageous over the likes of configuration tools such as Ansible which are procedural in nature. The problem with using procedural configuration tools is that it becomes far more difficult to track the overall state of your infrastructure - whereas provisioning tools like Terraform reduces drift.

# The Joys of Destroy

Another advantage of using a declarative approach is that it becomes very easy to modify your infrastructure or tear down your environments. You simply specify how you want your infrastructure to look within your .tf files and then execute the terraform apply command to provision the configuration.

For example, a developer might create several environments purely for the intention of testing a system before a production release. Using the terraform destroy command, a developer can quickly tear down the temporary infrastructure without the need for additional scripting.
Integrating this approach to immutable infrastructure as code within your CI/CD pipeline can save time and money - simply spin up your infrastructure, run your tests, and then tear down your infrastructure.

# Provisioning an Auto Scaling Group

Auto Scaling Groups (ASG) can automatically provision more instances of our microservice when the loads increase. In order to provision an ASG within our terraform file, we'll first want to create an AWS Security Groups that specifies both ingress and egress port rules for every instance within our ASG.

```js
provider "aws" {
  region = "eu-west-1"
}

data "aws_availability_zones" "available" {}

resource "aws_security_group" "instance" {
  name = "go-api-instance"

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_launch_configuration" "example" {
  image_id      = "ami-58d7e821"
  instance_type = "t2.micro"

  security_groups = ["${aws_security_group.instance.id}"]

  user_data = <<-EOF
              #!/bin/bash
              echo "Hello, World" > index.html
              nohup busybox httpd -f -p 80 &
              EOF

  lifecycle {
    create_before_destroy = true
  }
}
```

When an instances is created, we'll want it to execute a script that will install Docker, pull the published image from docker hub, run the image in detached mode, and map the ports correctly.
To make this happen, we'll create a `setup.sh` file within our project's repo and then pass this into our `aws_launch_configuration` via `user_data`.

```bash
#!/bin/bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt-get update
apt-cache policy docker-ce
sudo apt-get install -y docker-ce
sudo docker pull forbsey/go-docker:first
sudo docker run -d -p 80:8081 forbsey/go-docker:first
```

Using this approach, any instances created by our auto-scaling group will automatically configure themselves to run our microservice on startup - with no manual intervention needed!

# Provisioning an Elastic Load Balancer

In order to provision an Elastic Load Balancer (ELB) to automatically distributes incoming traffic across multiple targets, we'll first need to create a security group resource and specify both ingress and egress rules that will whitelist the IP addresses and ports of incoming and outgoing traffic.

```js
resource "aws_autoscaling_group" "example" {
  launch_configuration = "${aws_launch_configuration.example.id}"
  load_balancers       = ["${aws_elb.example.name}"]
  availability_zones   = ["eu-west-1b", "eu-west-1a"]
  min_size             = 2
  max_size             = 5

  tag {
    key                 = "Name"
    value               = "terraform-go-api"
    propagate_at_launch = true
  }
}

resource "aws_security_group" "elb" {
  name = "terraform-go-api"

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_elb" "example" {
  name               = "terraform-go-api"
  availability_zones = ["eu-west-1b", "eu-west-1a"]
  security_groups    = ["${aws_security_group.elb.id}"]

  listener {
    lb_port           = 80
    lb_protocol       = "http"
    instance_port     = 80
    instance_protocol = "http"
  }

  health_check {
    healthy_threshold   = 2
    unhealthy_threshold = 2
    timeout             = 3
    interval            = 30
    target              = "HTTP:80/"
  }
}

output "elb_dns_name" {
  value = "${aws_elb.example.dns_name}"
}
```

Once we've specified security group, we can go ahead and dictate the configuration of our ELB . We can specify which availability_zones to deploy our t2.micro instances, as well as the listeners and health checks for our load balancer to prevent our users from being impacted.

In the final output block, we'll also specify that our terraform apply command should output the final ELB A record - that'll inform us how to reach our newly deployed service.

After running the terraform apply command, you'll now see the elb_dns_name at the bottom of the output.

```output
aws_autoscaling_group.example: Still creating... (10s elapsed)
aws_autoscaling_group.example: Still creating... (20s elapsed)
aws_autoscaling_group.example: Still creating... (30s elapsed)
aws_autoscaling_group.example: Creation complete after 40s (ID: tf-asg-20180703193441821100000002)

Apply complete! Resources: 5 added, 0 changed, 0 destroyed.

Outputs:

elb_dns_name = terraform-go-api-1767816456.eu-west-1.elb.amazonaws.com
```

> Note: new services can take a while to show up due to DNS propagation timings

# The Finished Application!

Following the short and simple steps in this blog, we've been able to develop and deploy a production-ready go microservice that features:

* Scalability - our Auto Scaling Group will automatically provision more servers behind our Elastic Load Balancer should it be needed.
* Fault Tolerance - if one of our servers crash becomes unstable, our infrastructure will automatically provision a new healthy server and add that to our existing group.
* Resiliency - by deploying our application to multiple availability zones, we have provided a basic level of resiliency. If an additional level of resiliency is required, we could always make it multi-region.

This is pretty damn cool if you ask me! And in terms of effort - it wasn't a huge lift in order to get a basic load balancer and auto-scaling group up and running in a symbiotic fashion.
Hopefully, you enjoyed this article! If you want to learn more, then head over to my YouTube channel and subscribe or connect with me directly on Twitter at @Elliot_F.
Do you have any questions about Terraform or experience you'd like to share? Please drop a comment below - I'd love to hear from you!