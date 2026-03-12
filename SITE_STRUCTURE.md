# Trahom Website - Structure Documentation

## Navigation Structure

### Header Navigation (All Pages)
- **Top Bar** (disappears on scroll):
  - Desktop-only "Family Sign Up" + "Sponsor an Orphan" links (from `content.header.topLinks`)
  - Language selector (right-aligned)
  
- **Main Header**:
  - Logo (left)
  - Navigation Links: Mission, Impact, Campaigns, Contact
  - Donate Now button (right)
  - Hamburger menu (mobile only)

### Mobile Menu Navigation
- Full-screen slide-in menu
- Large navigation links:
  - Mission
  - Impact
  - Campaigns
  - Contact
  - Donate Now button
- "Family Sign Up" + "Sponsor an Orphan" links appear below Donate
- Footer area contains Privacy Policy + Terms of Service

### Footer Navigation (All Pages)
- "Family Sign Up" link - appears in "About" section
- "Sponsor an Orphan" link - appears in "Get Involved" section

## Page Components

### 1. App.tsx (Home Page)
- Main landing page
- Features: Hero, Impact Stats, Campaigns Grid, Mission Statement, Photo Carousel, Footer

### 2. MissionPage.tsx
- Mission statement and values
- Team information
- Vision and goals

### 3. ImpactPage.tsx
- Impact statistics
- Success stories
- Financial transparency
- Yearly progress

### 4. CampaignsPage.tsx
- Active campaigns grid
- Campaign cards with images, goals, progress bars
- Responsive: 3 columns (desktop) → 1 column (mobile)

### 5. ContactPage.tsx
- Contact form
- Office information
- Social media links
- Map integration

### 6. DonatePage.tsx
- Donation form
- Payment options
- Impact information

### 7. FamilySignUpPage.tsx
- Family registration form
- Support information
- Application process

## Design System

### Colors
- Primary Brand: `#e1a226` (Golden Yellow)
- Light Sky Blue: `#A8D5E2`
- Bright Blue: `#4A90E2`
- Golden Yellow: `#F5A623`
- Cream: `#FFF8E1`
- Background: `#f9fbff`

### Typography
- Swiss-inspired design
- Clean, sans-serif fonts
- Large tracking for headers
- Generous white space

### Responsive Breakpoints
- Mobile: < 640px (sm)
- Tablet: 640px - 768px (md)
- Desktop: 768px+ (lg)

## Common Issues & Solutions

### Issue: Links appearing in mobile top bar
**Solution**: These links should ONLY appear in the footer. Check:
1. Top bar section (should only have language selector)
2. Mobile menu footer section (should be completely removed)
3. Footer section (correct placement)

### Issue: Overlapping text on mobile
**Solutions**:
1. Use responsive text classes: `text-base sm:text-lg lg:text-xl`
2. Use responsive padding: `px-4 sm:px-6 lg:px-8`
3. Use responsive grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
4. Hide elements on mobile: `hidden sm:block`

### Issue: Inconsistent navigation across pages
**Solution**: All pages should use identical header/navigation structure. When updating navigation:
1. Update ALL page components simultaneously
2. Check for consistency in:
   - Top bar structure
   - Main navigation links
   - Mobile menu implementation
   - Footer links

## File Structure
```
/src
  /app
    App.tsx (Home Page)
    /components
      CampaignsPage.tsx
      ContactPage.tsx
      DonatePage.tsx
      FamilySignUpPage.tsx
      ImpactPage.tsx
      MissionPage.tsx
```

## Maintenance Checklist

When making navigation changes:
- [ ] Update all 7 page components
- [ ] Test on mobile (< 640px)
- [ ] Test on tablet (640px - 768px)
- [ ] Test on desktop (> 768px)
- [ ] Verify language selector works on all pages
- [ ] Check mobile menu animation
- [ ] Verify footer links on all pages
- [ ] Test all navigation links between pages

## Current Status (Last Updated)

✅ "Family Sign Up" and "Sponsor an Orphan" shown in:
- Top bar (desktop)
- Mobile menu (below Donate)
- Footer navigation (About/Get Involved)

✅ Top bar contains:
- Top links + language selector - CORRECT

✅ Mobile responsiveness fixed:
- Campaign cards
- Impact cards
- Text overflow
- Navigation spacing
