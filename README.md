<div>
  <img width="100" height="100" alt="bb-logo" src="https://github.com/user-attachments/assets/cc502d0e-174b-41d8-b86e-4c6ec0fbf957" /> 
<h1>book_buddy</h1>

</div>
reuse books. save money. reduce waste.

## OurPlanet.Rocks
book buddy was built for **ourplanet.rocks**, with **sdg 12** at its core<br /><br /><br />



it started with one student getting a used textbook from another student. now, i'm trying to make that simple idea easier to scale.

**book buddy** is a platform where students can **give away, swap, lend, and find used textbooks** instead of buying new ones every year. <br /><br /><br />
<img width="1893" height="943" alt="Screenshot 2026-08-10 230925" src="https://github.com/user-attachments/assets/c60c0e71-e849-49c1-a7b1-7da49a141a91" />

the idea came from my own experience. in high school, my mom suggested i get my books from a friend who was two grades ahead of me. i realized many students already did this through friends and word of mouth.

so i thought: what if finding a used book was as easy as finding a new one?

and that's how book buddy started.

## why book buddy?

book buddy is built around **sdg 12 — responsible consumption and production**.

textbooks are often used for just one year, even though they can still be useful for years.

instead of:

buy → use → store → repeat

book buddy encourages:

use → share → reuse → pass it on

the goal is simple: make reusing books easier and reduce unnecessary waste.

## what can you do?

students can:

* list books they no longer need
* swap, lend, or give books away
* find books they need
* chat with other students
* manage their listings
* track the status of their books

instead of asking "who do i know who has this book?"

you can ask "who has this book?"

## tech stack

* next.js
* react + typescript
* tailwind css
* mongodb + mongoose
* clerk for authentication
* socket.io for real-time chat
* cloudinary for images
* vercel for deployment

## testing

i built the prototype and tested the idea with five friends to see if it could replace the usual "ask a friend" way of finding used books.

the basic flow is:

**find a book → view it → request it → chat → reuse**

## what's next?

the current version is a prototype. eventually, i'd like to expand it from individual students to **school and city-wide book-sharing networks**.

some ideas include:

* school communities
* verified students
* book availability notifications
* school libraries and book banks
* tracking books reused and resources saved
* expanding across chandigarh and other cities

the long-term goal is simple:

**make reusing a book easier than buying a new one.**

**share what you have. get what you need. reuse what already exists.**



# to-dos:

1. smart book matching

* user enters the book they need
* ai finds relevant and nearby listings
* users can also upload a photo to identify a book

2. donate / swap / sell / lend

* users can choose how they want to offer their book
* donate it for free
* swap it with another book
* sell it at a low price
* lend it temporarily

3. ai book scanner

* upload a photo of a book
* ai extracts the title, author, edition, subject, grade, isbn, and condition
* automatically helps create the listing

4. school / college communities

* schools and colleges can have their own book buddy community
* students can find and exchange books within their community
* show basic stats like books available, participants, and books reused


# small to-dos:
- add an about page for the story




This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
