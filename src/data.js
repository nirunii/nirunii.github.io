// All the text and links shown on the site live in this file. Edit it to update your portfolio.
// PROJECTS: one entry = one project card on the site.
//   t     = project title             kind = one-line description
//   stack = tools used (shown as tags) pts  = bullet points about what you built
//   repo  = link to the project's GitHub repository ("" = link to your GitHub profile instead)
//   live  = link to the live demo ("" = no demo button)
//   img   = screenshot for the card, e.g. "/projects/subtly-chic.png"
//           (the image file goes in public/projects/; "" = show the small drawn sketch)
//const B + = import.meta.env.BASE_URL;

export const PROJECTS = [
  { t: "Petal", kind: "To-do and notes app, individual project",
    stack: ["JavaScript","React","Vite","Node.js", "Express", "PostgreSQL", "JWT",],
    pts: ["Full-stack task and notes app with sign-up and login, tasks with subtasks, color-coded projects, priorities, a seven-day upcoming view, and notes you can link to tasks.",
          "Express API with JWT login and hashed passwords. PostgreSQL stores users, tasks and notes, and every data query is filtered by the logged-in user, so each person’s data stays private."],
    repo: "https://github.com/nirunii/petal-todo-app", live: "https://nirunii.github.io/petal-todo-app/", img: "/projects/petal.jpeg" },
  { t: "Aria", kind: "Fashion e-commerce web application, individual project",
    stack: ["JavaScript","React", "Node.js", "PostgreSQL", "Express", "JWT"],
    pts: ["Storefront with category filtering, search and sorting, a bag that persists between visits, JWT sign-in, and an admin dashboard for adding products with photo uploads.",
          "Normalized PostgreSQL database with transaction-based order processing, server-side price and stock checks, row locking and hashed passwords."],
    repo: "https://github.com/nirunii/aria-store", live: "https://nirunii.github.io/aria-store/", img: "/projects/aria.jpeg" },
  { t: "Portfolio Website", kind: "This website, individual project",
    stack: ["JavaScript", "React", "Vite", "CSS","Git and GitHub"],
    pts: ["Responsive layout that adapts from phones to large monitors, with light and dark modes and reduced-motion support.",
          "All text, projects, skills and notes live in one data file, so the site is easy to update."],
    repo: "", live: "", img: "/projects/portfolio.jpeg" },
];

// SKILLS: each row = a category name and the skills inside it.
export const SKILLS = [
  ["Full-stack web development", ["JavaScript", "HTML5", "CSS3", "React", "Next.js", "Node.js", "Tailwind CSS", "REST APIs"]],
  ["Databases", ["PostgreSQL", "PL/SQL", "Oracle APEX"]],
  ["Testing", ["Postman", "Selenium", "JMeter"]],
  ["Tools and deployment", ["Git", "GitHub", "Vite", "Netlify"]],
];

// NOTES: your short articles. t = title, date, tags, sum = summary, body = list of paragraphs.
export const NOTES = [
  
  { t: "How a login token works in Petal", date: "October 2026", tags: ["JWT", "Node.js", "Security"],
    sum: "What is inside a JWT, why it can’t be faked, and what it can’t do.",
    body: [
      "After you log in to Petal, my to-do and notes app, the server gives your browser a JSON Web Token, or JWT. It is a short piece of text with three parts: a header, a payload holding your user id and an expiry time, and a signature.",
      "The signature is the important part. The server creates it with a secret key that only the server knows. If anyone changes the payload, for example to pretend to be another user, the signature no longer matches and the token is rejected. The payload itself is only encoded, not encrypted, so anyone can read it. That is why it holds nothing secret.",
      "The token expires after seven days. The browser keeps it and sends it with every request, and a small piece of middleware checks it before any route runs. When the app opens, it also asks the server who the token belongs to, and if the server says it is no longer valid, the app sends you back to the login screen.",
      "The approach has two trade-offs. The server keeps no session list, so it cannot cancel a token before it expires. And I store the token in localStorage, which scripts on the page can read. Before real users arrive, I would move it to an httpOnly cookie. The secret key also has to stay long and private, because anyone who had it could create valid tokens.",
    ] },
  { t: "Why my fashion store never trusts the cart", date: "October 2026", tags: ["PostgreSQL", "Express", "Security"],
    sum: "What stops a customer from buying a dress for $0.01 by editing their own browser?",
    body: [
      "Aria keeps the shopping bag in the browser, stored in localStorage, so it survives a page refresh without needing a login. That is convenient, but anything in a customer’s browser can be changed. Someone can open the developer tools, edit the saved bag, and make an $89 dress show a price of $0.01. If checkout trusted that number, anyone could set their own prices.",
      "So at checkout the browser sends no prices at all. For each item it sends only the product id, the size and the quantity. The server looks up the real price in the products table, then checks that the product still exists, that enough stock is left, and that the chosen size is one the dress actually comes in. The whole order runs inside one database transaction, and the product rows are locked while it runs. If any check fails, nothing is saved.",
      "There was a quieter problem too. If the orders table only pointed at the product, a later price change would silently change what old orders say the customer paid. So the order items table copies the dress name, size, quantity and unit price at the moment of purchase. A customer who paid $89 still sees $89 in their order history, even if the dress costs $110 next season.",
      "The lesson I took from it is to treat the browser as a place to collect what the customer wants, not as a source of truth. The frontend can show prices for convenience, but the server and the database decide what is actually charged.",
    ] },
  { t: "What testing a website taught me as a QA tester", date: "October 2026", tags: ["QA", "Testing", "Teamwork"],
    sum: "Writing bug reports developers can act on, and why retesting matters as much as finding bugs.",
    body: [
      "As a QA tester on my university's website development project, my job was to use the site the way real people would and find where it breaks. I tested features and interfaces, then worked with the developers to track each defect and confirm the fix.",
      "A useful bug report is one a developer can act on without asking questions: what I did, what I expected, what happened instead, and where it happened (page, browser, device). A screenshot helps a lot.",
      "Retesting matters as much as finding bugs. A fix can break something nearby, so after each fix I checked the original problem and the features around it.",
      "It also made me a more careful developer. Tools like Postman, Selenium and JMeter let me check APIs, browser actions and load in a repeatable way instead of clicking around by hand."
    ] },
];

// Your links. Change these to update every GitHub / LinkedIn / email button on the site.
export const GH = "https://github.com/nirunii";

export const LI = "https://www.linkedin.com/in/j-m-u-niruni-prabhasha-a42668343/";

export const EMAIL = "nirunijayamaha0218@gmail.com";

// CV: the file people download from the Download CV button. Put your PDF in the public/ folder
// with exactly this name (or change the name here). Set to "" to hide the button.
export const CV = "/Niruni-Prabhasha-CV.pdf";

// PHOTOS: pictures for the polaroid slider at the top. Put image files in public/photos/
// and list them like this:  { src: "/photos/me1.jpg", alt: "Niruni at her laptop" },
export const PHOTOS = [
  { src: "/photos/me5.png", alt: "Niruni smiling at the camera" },
  //{ src: "/photos/me3.png", alt: "Niruni working on her laptop" },
];

export const TECH = ["React", "Node.js", "PostgreSQL", "Supabase", "Tailwind CSS", "Next.js", "Postman", "Selenium", "JMeter", "Git"];
