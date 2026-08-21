  # Mridula Raksha Bandhan Digital Scrapbook

This is a static HTML/CSS/JavaScript scrapbook site. You can open `index.html` directly in a browser, or upload the whole folder to any static host.

## Files

- `index.html` - the scrapbook structure and sections.
- `styles.css` - all visual styling and responsive layout.
- `script.js` - page transitions, flip cards, timeline rendering, and confetti.
- `content.js` - the main file you edit to replace placeholder text and photos.
- `assets/photos/` - put your real images here.
- `assets/audio/` - put the background music file here.

## How to edit the words

Open `content.js`. Every line is intentionally named by section:

- Cover: `coverTitle`, `coverSubtitle`
- Full cover details: `coverRibbon`, `coverHandwritten`, `coverDetailOne`, `coverDetailTwo`, `coverDetailThree`, `coverPrimaryButton`, `coverSecondaryButton`
- Opening page: `introTitle`, `introText`
- Timeline: `timeline`
- Appreciation cards: `appreciationCards`
- Funny sister notes: `funnyNotes`
- Thank-you page: `thanksTitle`, `thanksTextOne`, `thanksTextTwo`
- Future page: `futureItems`
- Final page: `finalTitle`, `finalMessage`

Keep text inside the quotation marks. Example:

```js
finalTitle: "Happy Raksha Bandhan, Mridula."
```

## How to add photos

1. Copy your photos into `assets/photos/`.
2. Use simple filenames, for example:
   - `first-memory.jpg`
   - `birthday.png`
   - `final-photo.jpeg`
3. Open `content.js`.
4. Replace a placeholder image path with your photo path.

Example:

```js
finalPhoto: "./assets/photos/final-photo.jpeg"
```

Timeline photos work the same way:

```js
{
  label: "How it started",
  date: "2023",
  title: "The first proper conversation",
  text: "Write your memory here.",
  image: "./assets/photos/first-memory.jpg",
}
```

## How to add background music

The site is already wired for the song button.

1. Get your own MP3 copy of **Frangipani by Kaber Vasuki**.
2. Rename the file exactly:

```text
frangipani.mp3
```

3. Put it here:

```text
assets/audio/frangipani.mp3
```

4. Open `index.html`, open the envelope, then click the round music button.

Browsers usually block music from autoplaying, so the visitor needs to click the music button once.

## How to add more timeline moments

Copy one timeline block inside `content.js`, paste it below the existing ones, and edit the values.

Make sure each block has a comma after it except the final block.

## How to add more appreciation cards or funny notes

For appreciation cards, add another object:

```js
{
  front: "Short front text",
  back: "Longer hidden message after she clicks.",
}
```

For funny notes, add another quoted line:

```js
"Another inside joke goes here."
```

## Preview

Open `index.html` in your browser. The site should work without installing anything.

If you upload it online, upload the entire `mridula-scrapbook` folder so the images, styles, and scripts stay connected.
