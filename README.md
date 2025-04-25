<p align="center">

<img src="https://socialify.git.ci/aleguy02/Doors/image?description=1&font=Inter&issues=1&name=1&owner=1&pattern=Formal+Invitation&stargazers=1&theme=Dark" alt="GitHub Socialify image" width="400px">
</p>

<h1 align="center" style="font-weight: bold;">Doors 🚪</h1>

<p align="center">
<a href="#technologies">Tech Stack</a>
<a href="#understanding">Understanding the Code Base</a>
<a href="#roadmap">Roadmap</a>
<a href="#started">Getting Started</a>
<a href="#design">Architecture/Design</a>

</p>

<p align="center">Doors is a mobile app for independent bands looking to measure event turnout without looking corporate. Its simple setup enables low-resource bands to easily measure the success level of their gigs based on audience turnout over time.</p>

<p align="center">
<a href="https://github.com/aleguy02/Doors">View Repo</a>
</p>

<h2 id="technologies">Tech Stack</h2>

[![My Skills](https://skillicons.dev/icons?i=npm,react,ts,tailwind,firebase,babel,jest)](https://skillicons.dev) ... and more!

- [NPM](https://www.npmjs.com/) for package management
- [TypeScript](https://www.typescriptlang.org/) because we love typechecking
- [React Native](https://reactnative.dev/) to build for all platforms
- [Nativewind](https://www.nativewind.dev/) because scaling CSS is tedious
- [Firebase](https://firebase.google.com/) for simpler authentication
- [Firestore](https://firebase.google.com/docs/firestore) for flexibility with data and easy scaling
- [Expo Go](https://expo.dev/) for an integrated environment and intuitive routing
- [Jest](https://jestjs.io/) to create a comprehensive testing suite

<h2 id="understanding">Understanding the Code Base</h2>

### Project Directories
```
doors/
├── app                      # special routes directory/
│   ├── (auth)                 # authentication route
│   ├── (tabs)                 # home screens route
│   └── (user)                 # user settings route/
│       └── managebands          # managing bands route
├── assets                   # static assets/
│   └── icons                  # app icons
└── src                      # main app logic/
    ├── components             # custom react native components/
    │   ├── buttons              # custom buttons
    │   ├── modals               # custom modals
    │   └── screens              # all the different screens
    ├── configs                # app configurations
    ├── contexts               # custom react contexts
    ├── services               # business logic
    └── types                  # custom TypeScript types
```
<!--- https://tree.nathanfriend.com/?s=(%27opG5s!(%27fancy!true~fullPath!falE~trailingSlash!true~rootDot!falE)~I(%27I%27doorAappL.special3QdiRctoryBaNhCaNhenGcU53BtabsChomH63BuErCuEr%20EtGngs30LmanagebandsL*7managing%20bands3040asEts4*-stUc%20asEtA*iMs4.8iMAsrcL.main%208JFsKnUvHFA4bNt5s.2bNt5A4modalV-2modalA46.all%20thHdiffeRn960*MfigV.8MfigurU5A*OVKOA*ErviceV-businesQJtypes4.2TypeScrip9typeA%27)~versi5!%271%27)*%20%20-L4%207.L4*70%5Cn*2custom%203%20roNe4**5on6scRens7%23%208app%209t%20As0B0*%7BC%7D4-EseFcomp5entGtiHe%20Isource!Jlogic0*K-2Rac9L44Mc5NutOMtextQs%20RreUaGVs*%01VURQONMLKJIHGFECBA987654320.-* --->
The diagram above explains the file structure of the project. The get a better understanding of the codebase you can *read* the code. There are helpful comments and files peppered throughout the project.

<h2 id="roadmap">Roadmap</h2>

Doors is currently still under construction. My goal is to achieve an MVP by mid May or early June before deploying to each platforms respective app store. To get a sense of the vision for the MVP, please take a look at the <a href="#design">design files</a> below

<h2 id="started">Getting Started</h2>

Follow these steps to set up Doors locally. Googling is encouraged if you get stuck on any step, or feel free to reach out to me directly!

<h3>Prerequisites</h3>

- [Create a new Firebase project](https://firebase.google.com/docs/web/setup)
- [Install Node.js](https://nodejs.org/en) v20+
- [Install NPM](https://www.npmjs.com/) v10+
- Mobile device with Expo Go app installed

<h3>Cloning</h3>

After forking this repository, clone your fork and move into the newly cloned directory.

```bash
git clone FORKED_REPO_URL
cd cloned_repo
```

<h3>Starting</h3>

Create a new file called `.env` in the root directory. Copy all the contents inside `.env_example` and paste them into this new `.env` file. Finally, replace the empty credentials with the credentials found in the "Project settings" page in your Firebase console. Then...

Install dependencies

```bash
npm install
```

Then run Expo Go to test in development.

```bash
npm run start
```

Follow the instructions in your terminal to open Expo Go. If you are having trouble opening the app with `npm run start` try `npm run tunnel`.

<h3>Issues</h3>

Though I started Doors as a solo project, community contributions are welcome! Check out the GitHub Issues tab to see open issues and feel free to work on any! Please make sure to follow the coding style and put any new files where they belong (see file structure above). Make your changes on a new branch in your fork and when you're ready, open a pull request.

<h2 id="design">⚙Architecture/Design</h2>

[💡 Initial Brainstorm Page](https://whimsical.com/doors-flowmap-TSBHo3gc9ncG6JTnWDJgof)

[🎨 Figma Design Page](https://www.figma.com/design/lL30PUc2XTRDPm9haVRBJr/Doors?node-id=1-2&t=fAuTF0iYxjdsObCB-1)

---

This README.md was drafted using a template from [makeread.me](https://github.com/ShaanCoding/makeread.me)
