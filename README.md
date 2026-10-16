# Aya Zeddoun — Personal Portfolio

## Student name

**Zeddoun Aya** — Third-year Computer Science Engineering student, École Supérieure des Technologies Avancées (ESTA).

## Project description

A responsive, single-page personal portfolio built from my CV. It presents who I am, my skills, internships, projects, student activities, education, certifications and CTF competitions, and lets visitors contact me. The site is built with only HTML, CSS and vanilla JavaScript (no framework, no library, no build step).

**Live demo:** `https://ayazedd7.github.io/<repository-name>/` *(replace with your GitHub Pages link)*

## Technologies used

- **HTML5** — semantic structure (`header`, `nav`, `main`, `section`, `footer`)
- **CSS3** — custom properties (variables), Flexbox, Grid, media queries, transitions and animations
- **JavaScript (ES6+)** — DOM manipulation, `IntersectionObserver`, `localStorage`, form validation
- **Git & GitHub** — version control, hosted with GitHub Pages

## Implemented features

- Fixed navigation bar with active-section highlighting while scrolling
- Responsive design for desktop, tablet and mobile, with a hamburger menu
- Dark / light theme toggle, remembered with `localStorage`
- Typing animation of my roles in the hero section
- Scroll progress bar and "back to top" button
- Scroll-reveal animations on every section
- Animated counters (internships, projects, CTFs, certifications) and animated language level bars
- Skills grouped by category (programming, cybersecurity, networking, data & AI, tools)
- Experience and education shown as timelines
- Project cards with a Security / Web filter
- Activities (Shellmates, CODEC), certifications, events and CTF competitions
- Contact form with client-side validation (name, email format, message length) that opens the visitor's mail app
- Accessible: semantic tags, `aria-label`s, keyboard-friendly buttons, reduced-motion support

## Project structure

```
portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/          (optional — add your photo / screenshots here)
└── README.md
```

## Run locally

Open `index.html` in any browser. No installation is needed.

## Publish on GitHub Pages

1. Create a new public repository on GitHub (for example `portfolio`).
2. Upload the project files, or push them from the terminal:
   ```bash
   git init
   git add .
   git commit -m "Add portfolio"
   git branch -M main
   git remote add origin https://github.com/ayazedd7/portfolio.git
   git push -u origin main
   ```
3. On GitHub, open **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/ (root)`, then **Save**.
4. After about a minute the site is live at `https://ayazedd7.github.io/portfolio/`.

## Screenshots

Add your screenshots to the `images/` folder and reference them here:

| Home | Skills | Projects |
|------|--------|----------|
| ![Home](images/home.png) | ![Skills](images/skills.png) | ![Projects](images/projects.png) |

## Contact

- GitHub: https://github.com/ayazedd7
- LinkedIn: http://linkedin.com/in/aya-zeddoun-262b7b243
- Email: aa.zeddoun@ensta.edu.dz
