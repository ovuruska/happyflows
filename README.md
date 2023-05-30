# HappyFlows: Prompt-Driven Project Bootstrapping
[![NPM](https://nodei.co/npm/happyflows.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/happyflows/)

![happyflow_logo](docs/logo.png)

HappyFlows is a dynamic, prompt-based project bootstrapping library designed to streamline the project initiation process. It uses NodeJS and the command-line interface (CLI) to intuitively guide you through the setup process for your new projects, saving you time and effort.

## Table of Contents

- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

HappyFlows aims to simplify the project setup process by generating tailored project templates based on your responses to a series of prompts.

## Installation

HappyFlows is a NodeJS based CLI tool. Make sure you have [NodeJS](https://nodejs.org/en/) installed in your environment.

To install HappyFlows globally on your machine, simply run:

```bash
npm install -g happyflows
```

## Usage

After successful installation, you can start a new project using HappyFlows by entering the following command:

```bash
happyflow
```

This will start a prompt asking you to explain your project in a few words, for example:

```bash
? Explain your program in a few words:  
Flask microservices: users, books and genres. They should be backed by PostgreSQL. Terraform and Kubernetes infra. Kafka as event broker.
```

Based on your input, HappyFlows will generate a relevant project structure to get you started!
Resulting structure will be like 
```bash
.
├── books
│   ├── Dockerfile
│   ├── __init__.py
│   ├── k8s-deployment.yaml
│   ├── k8s-service.yaml
│   ├── main.py
│   └── requirements.txt
├── genres
│   ├── Dockerfile
│   ├── __init__.py
│   ├── genre_updated.avsc
│   ├── k8s-deployment.yaml
│   ├── k8s-resources
│   ├── k8s-service.yaml
│   ├── kafka-configmap.yaml
│   ├── kafka-deployment.yaml
│   ├── kafka-schemas
│   ├── kafka-service.yaml
│   ├── main.py
│   ├── main.tf
│   ├── namespace.yaml
│   ├── postgresql-sts.yaml
│   ├── requirements.txt
│   ├── terraform
│   ├── user_created.avsc
│   └── variables.tf
└── users
    ├── Dockerfile
    ├── __init__.py
    ├── k8s-deployment.yaml
    ├── k8s-service.yaml
    ├── main.py
    └── requirements.txt

```


## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

Please let me know if you want to add or change anything.
