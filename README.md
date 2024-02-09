# picster
Picster is a Social Media Application that revolves around Photos.

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

To contribute to Picster, follow these steps:

1. Fork this repository.
2. Create a branch: `git checkout -b <branch_name>`.
3. Make your changes and commit them: `git commit -m '<commit_message>'`.
4. Push to the original branch: `git push origin <branch_name>`.
5. Create the pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.