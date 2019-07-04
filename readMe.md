# Bilan énergétique

Project for participating to the "Fête de la Science".

## Objective

The project will allow users to get their energy consumption check-up after filling a survey

UI needs to be touch compatible.

## Set-Up

Install the current NodeJS (https://nodejs.org/)

Install Git (https://git-scm.com/)

Create a folder and from the command line clone the repository
```
git clone https://github.com/JeanRemiDelteil/maquette-empreinte-energetique.git
```

In the cloned folder, install of required dependencies (from a command line)
```
npm install
```

Setup is Done !

## Test development locally

Run the development server:
```
npm run watch
```

Visit http://localhost:5000 to see the local site

You can edit the code, save, wait for auto-rebuild then refresh the site to see the updated code.

## Build for DEV site, and deploy
You need access to the Firebase project for this.

```
npm run build:devWeb
npm run deploy:devWeb
```
