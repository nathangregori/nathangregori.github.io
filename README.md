# Nathan Gregori Portfolio Website

A high-end, ultra-modern portfolio website for Nathan Gregori, featuring a luxury design with glassmorphic elements, neumorphic buttons, and dynamic animations.

## Features

- Dark theme with vibrant accent gradient
- Interactive cursor trail effect using Canvas
- Glassmorphic UI components 
- Neumorphic 3D styled buttons
- Smooth scroll animations with Intersection Observer
- Dynamic text rotation in hero section
- Mobile-friendly responsive design
- Cross-browser compatibility

## Pages

1. **Homepage** - Hero section with dynamic role rotator, bio preview, projects preview, testimonials, and CTA
2. **About** - Detailed bio, personal strengths, and pillars
3. **Projects & Achievements** - Filterable project showcase and key achievements
4. **Gallery** - Visual showcase with filterable categories
5. **Blog** - Blog listing with featured post, newsletter signup, and categorized articles
6. **Blog Post** - Detailed article page with related posts
7. **Contact** - Contact form and information

## Technologies Used

- HTML5
- CSS3 (Custom properties, Flexbox, Grid)
- JavaScript (ES6+)
- Canvas API for cursor effects
- Intersection Observer API for scroll animations
- Phosphor Icons (via CDN)
- Google Fonts (Inter)

## Project Structure

```
/
├── index.html                # Homepage
├── about.html                # About page
├── projects.html             # Projects & achievements page
├── gallery.html              # Gallery page  
├── blog.html                 # Blog listing page
├── contact.html              # Contact page
├── blog/                     # Blog post pages
│   └── trauma-to-fuel.html   # Sample blog post
├── css/                      # Stylesheets
│   ├── styles.css            # Main stylesheet
│   └── blog-post.css         # Blog post specific styles
├── js/                       # JavaScript files
│   ├── main.js               # Main JavaScript functionality
│   └── cursor-trail.js       # Cursor trail effect
├── img/                      # Image assets
│   ├── nathan.png            # Profile photo
│   └── logo-*.png            # Logo images
└── README.md                 # Project documentation
```

## Setup & Deployment

### Local Development

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/nathan-gregori-portfolio.git
   ```
2. Open the project in your code editor
3. Launch with a local server:
   - Using VS Code Live Server extension
   - Or using Python: `python -m http.server`
   - Or any other local server solution

### Deployment to GitHub Pages

1. Create a new GitHub repository
2. Push the code to your repository:
   ```bash
   git remote add origin https://github.com/yourusername/nathan-gregori-portfolio.git
   git branch -M main
   git push -u origin main
   ```
3. Go to repository Settings > Pages
4. Select the `main` branch as the source
5. Set the folder to `/root`
6. Save changes and your site will be published at `https://yourusername.github.io/nathan-gregori-portfolio/`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Credits

- Fonts: [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts
- Icons: [Phosphor Icons](https://phosphoricons.com/)
- Images: [Unsplash](https://unsplash.com/)

## License

This project is available for personal and commercial use with attribution.

## Contact

For any questions or suggestions, please reach out to Nathan at [npgregori2-c@my.cityu.edu.hk](mailto:npgregori2-c@my.cityu.edu.hk). 