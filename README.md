<p align="center">

<img src="https://socialify.git.ci/aleguy02/Doors/image?description=1&font=Inter&issues=1&name=1&owner=1&pattern=Formal+Invitation&stargazers=1&theme=Dark" alt="GitHub Socialify image" width="400px">
</p>

<h1 align="center" style="font-weight: bold;">Doors 🚪</h1>

<p align="center">
<a href="#technologies">Technologies</a>
<a href="#started">Getting Started</a>
<a href="#design">Architecture/Design</a>

</p>

<p align="center">Doors is a mobile app for independent bands looking to measure event turnout without looking corporate. Its simple setup enables low-resource bands to easily measure the success level of their gigs based on audience turnout over time.</p>

<p align="center">
<a href="https://github.com/aleguy02/Doors">View Repo</a>
</p>

<h2 id="technologies">💻 Technologies</h2>

- React Native
- Nativewind
- Firebase
- Expo Go (development)

<h2 id="started">🚀 Getting started</h2>

Follow these steps to set up Doors locally. Googling is encouraged if you get stuck on any step, or feel free to reach out to me directly!

<h3>Prerequisites</h3>

- [Firebase project](https://firebase.google.com/docs/web/setup)
- [Node.js](https://nodejs.org/en)
- npm
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

<h2 id="design">⚙️ Architecture/Design</h2>

[💡 Initial Brainstorm Page](https://whimsical.com/doors-flowmap-TSBHo3gc9ncG6JTnWDJgof)

[🎨 Figma Design Page](https://www.figma.com/design/lL30PUc2XTRDPm9haVRBJr/Doors?node-id=1-2&t=fAuTF0iYxjdsObCB-1)

---

This README.md was created using a template from [makeread.me](https://github.com/ShaanCoding/makeread.me)
