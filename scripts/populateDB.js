const db = require('../db'); // Ensure this points to your database configuration file

const portfolioData = [
  { title: 'Innovative UX Design', description: 'Cutting-edge UX designs for mobile apps.', image_url: 'url1', keywords: 'UX, Mobile Apps, User-Centered, Sketch, Figma' },
  { title: 'Creative UI Concepts', description: 'Revolutionary UI concepts for modern web.', image_url: 'url2', keywords: 'UI, Web Design, Adobe XD, Photoshop' },
  { title: 'Freelance Graphic Artist', description: 'A collection of freelance graphic design works.', image_url: 'url3', keywords: 'Graphic Design, Freelance, Illustrator, Creativity' },
  { title: 'E-commerce UX Case Study', description: 'UX case study for an e-commerce platform.', image_url: 'url4', keywords: 'E-commerce, UX, Case Study, Shopify, User Research' },
  { title: 'Minimalist UI Design', description: 'Minimalist UI designs for applications.', image_url: 'url5', keywords: 'UI, Minimalist, Simplicity, Figma' },
  { title: 'Branding & Identity', description: 'Brand identity and logo design projects.', image_url: 'url6', keywords: 'Branding, Logo Design, Identity, Illustrator, Photoshop' },
  { title: 'Motion Graphics Designer', description: 'Portfolio of motion graphics and animation.', image_url: 'url7', keywords: 'Motion Graphics, Animation, After Effects, Cinema 4D' },
  { title: 'UX Research and Analysis', description: 'In-depth UX research for various projects.', image_url: 'url8', keywords: 'UX Research, Analysis, User Testing, Figma' },
  { title: 'Interactive Web UI', description: 'Interactive and dynamic web UI projects.', image_url: 'url9', keywords: 'Web UI, Interactive, JavaScript, React' },
  { title: 'Mobile App Redesign', description: 'Redesigning mobile apps for better UX.', image_url: 'url10', keywords: 'Mobile App, Redesign, UX, Sketch, InVision' },
  { title: 'Digital Illustration', description: 'Digital illustrations and artwork.', image_url: 'url11', keywords: 'Illustration, Digital Art, Photoshop, Procreate' },
  { title: 'Responsive Web Design', description: 'Responsive and adaptive web design projects.', image_url: 'url12', keywords: 'Responsive, Web Design, HTML, CSS, JavaScript' },
  { title: 'UX for Social Media', description: 'Designing UX for social media platforms.', image_url: 'url13', keywords: 'Social Media, UX, User Engagement, Analytics' },
  { title: 'Product Packaging Design', description: 'Innovative packaging design projects.', image_url: 'url14', keywords: 'Packaging, Product Design, Illustrator, Print' },
  { title: 'SaaS UI Design', description: 'UI designs for SaaS platforms.', image_url: 'url15', keywords: 'SaaS, UI, Web Application, Figma, Sketch' },
  { title: 'Infographic Design', description: 'Creating engaging and informative infographics.', image_url: 'url16', keywords: 'Infographics, Data Visualization, Illustrator, Graphics' },
  { title: '3D Graphic Design', description: 'Portfolio of 3D graphic design and modeling.', image_url: 'url17', keywords: '3D Graphics, Modeling, Blender, Cinema 4D' },
  { title: 'Virtual Reality Design', description: 'Design for VR applications and experiences.', image_url: 'url18', keywords: 'VR, Virtual Reality, 3D Design, Unity' },
  { title: 'Game UI/UX Design', description: 'UI/UX design for mobile and PC games.', image_url: 'url19', keywords: 'Game Design, UI, UX, Unity, Unreal Engine' },
  { title: 'Accessibility in Design', description: 'Focus on accessibility in web and app design.', image_url: 'url20', keywords: 'Accessibility, Web Design, UX, Inclusive Design' }
];

async function populatePortfolios() {
  try {
    for (const portfolio of portfolioData) {
      await db.query(
        'INSERT INTO portfolios (title, description, image_url, keywords) VALUES ($1, $2, $3, $4)',
        [portfolio.title, portfolio.description, portfolio.image_url, portfolio.keywords]
      );
    }
    console.log('Portfolios added successfully');
  } catch (err) {
    console.error('Error populating portfolios:', err);
  }
}

populatePortfolios();
