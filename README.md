# picster
Picster is a Social Media Application that revolves around Photos.

## Live Demo

You can view the live demo of picster [here](https://picster-web.netlify.app/).

## Screenshot

![screenshot](/client/public/picster-demo.png)

## Installing Picster

To install Picster, follow these steps:

1. Clone the repository:
   ```
   git clone git@github.com:ShlokBharadwaj/picster.git
   ```
2. Navigate to server directory:
   ```
   cd picster/server
   ```
3. Install dependencies:
   ```
    npm i
    ```
4. Start the server:
   ```
   npm run dev
   ```
5. Open another terminal window and navigate to the client directory:
    ```
    cd ../client
    ```
6. Install dependencies:
    ```
    npm i
    ```
7. Start the client:
    ```
    npm start
    ```
8. Open [http://localhost:3000](http://localhost:3000) to view the frontend in the browser.

9. Open [http://localhost:3333](http://localhost:3333) to view the backend in the browser.

## Using Picster

To use Picster, follow these steps:

<!-- Create a .env files with keys, take .env.sample for reference-->

1. Go to the root of the client directory and create a `.env` file.

```
touch .env
```

2. Navigate to `.env.sample` in the same directory and copy the contents to `.env`.

```
cp .env.sample .env
```

3. Replace the values of the keys with your own values.

*Hint*: _Follow the directions in the `.env.sample` file to know what values to replace._

## Contributing to Picster

We welcome contributions from everyone. Here are the steps to contribute to Picster:

1. **Fork this repository.**
    - Click on the 'Fork' button at the top-right corner of this page. This will create a copy of this repository in your GitHub account.

2. **Clone the forked repository to your local machine.**
    - Go to your GitHub account, open the forked repository, click on the 'Code' button and then click the 'copy to clipboard' icon to get the clone command.
    - Open a terminal and run the following git command:
      ```
      git clone "url you just copied"
      ```

3. **Create a new branch where you'll make your changes.**
    - Navigate to the cloned directory.
    - Use the `git checkout` command to create a new branch, replace `<branch_name>` with whatever you want to name your branch:
      ```
      git checkout -b <branch_name>
      ```

4. **Make your changes and commit them.**
    - Make the changes in the code.
    - Use the `git add` command to add the files you've changed:
      ```
      git add .
      ```
    - Use the `git commit` command to save your changes locally:
      ```
      git commit -m '<commit_message>'
      ```

5. **Push your changes to your forked repository.**
    - Use the `git push` command to upload your changes to your forked repository on GitHub:
      ```
      git push origin <branch_name>
      ```

6. **Create a pull request.**
    - Go to your GitHub account, open the forked repository, click on the 'Pull request' button, and create a new pull request.

Please ensure your pull request adheres to our coding conventions and is consistent with the project's style. If you're unsure about anything, feel free to ask!

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.