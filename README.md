# How to Get TodoList Up and Running

## 1. Prerequisites for TodoList

- You should have .NET 8 SDK installed

- You should have a stable version of Node.js

- You should have Git installed

- You should have GitHub account

## 2. Install .NET 8 SDK

Download and install .NET 8 SDK from [Download .NET 8.0](https://dotnet.microsoft.com/zh-cn/download/dotnet/8.0)

Following the installation wizard to complete the process.

## 3. Install Node Package Manager

When you install Node.js, it comes with an `npm` package. To check your Node.js and `npm` package version, run the following commands on terminal:

To check the version of Node.js installed, print the version with the following command

```shell
node --version
```

You can check the version of `npm` using the same option:

```shell
npm --version
```

## 4. Install Angular CLI

To install the Angular CLI, run the following command:

```shell
npm install -g @angular/cli
```

To check the Angular CLI version, run the command:

```shell
ng version
```

## 5. Get the TodoList Source Code Locally

Run the `git clone` command to copy the project to your folder.

```shell
git clone <REMOTE_URL>
```

## 6. Install required npm Packages

You need to install all packages and dependencies from the cloned project to run it.

To install the packages, run the command:

```shell
npm install
```

If you encounter any vulnerability reports, fix them with command:

```shell
npm audit fix
```

## 7. Open the project in a Broweser

Now you have all requirements to run the project.

First, run the WebAPI backend server with commands:

```shell
cd /ToDoList/TodoApi
dotnet run
```

Next, run the Angular frontend web app:

```shell
cd /ToDoList/TodoAui
ng serve
```

Then, open http://localhost:4200/ in a browser to test the project.

You can use the Angular CLI automatically open the web project in a browser:

```shell
ng serve --open
```

The above command builds the app, launches the server, and watches the files for updates.

In your browser, you should see the `TodoList` website