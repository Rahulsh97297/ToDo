# TODO Application Design Guidelines

## Design Approach

**Selected Approach:** Design System + Reference-Based Hybrid

**Primary References:**
- Linear: Clean typography, minimal interface, focus on content
- Todoist: Clear task hierarchy, efficient interactions
- Notion: Approachable productivity aesthetic

**Core Principles:**
1. Clarity over decoration - every element serves a purpose
2. Speed and efficiency in task management
3. Clean, uncluttered interfaces that reduce cognitive load
4. Subtle visual feedback without distraction

---

## Typography

**Font Stack:** Inter (via Google Fonts)
- Headings: 700 weight, tracking-tight
- Body: 400 weight, tracking-normal
- Labels/Meta: 500 weight, text-sm

**Hierarchy:**
- Page titles: text-2xl md:text-3xl font-bold
- Section headers: text-lg font-semibold
- Todo items: text-base font-medium
- Helper text: text-sm text-gray-600
- Timestamps: text-xs font-normal

---

## Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 6, and 8
- Component padding: p-4 or p-6
- Section spacing: space-y-4 or space-y-6
- Card gaps: gap-4
- Page margins: px-4 md:px-8

**Container Strategy:**
- Auth pages: max-w-md mx-auto (centered card)
- Dashboard: max-w-5xl mx-auto (comfortable width for lists)
- All pages: min-h-screen with proper vertical centering

---

## Component Library

### Navigation Header
- Fixed top bar: sticky top-0 with subtle border-bottom
- Logo/title on left, user menu + logout on right
- Height: h-16, subtle shadow for elevation

### Authentication Cards
- Centered card with max-w-md
- Padding: p-8
- Border: rounded-lg with subtle border
- Shadow: shadow-md for depth
- Logo/app name at top: text-3xl font-bold mb-8
- Form spacing: space-y-6

### Form Elements
- Input fields: Full width, rounded-md, border, px-4 py-3
- Focus states: ring-2 ring-offset-2 treatment
- Labels: text-sm font-medium mb-2
- Error messages: text-sm text-red-600 mt-1
- Submit buttons: Full width, py-3, rounded-md, font-semibold

### Todo List Components
- Todo container: Rounded cards with border, hover:shadow-sm transition
- Each todo item: p-4, flex layout with checkbox + text + actions
- Checkbox: Custom styled, mr-3, rounded
- Todo text: flex-1, with strikethrough when completed (line-through, text-gray-400)
- Action buttons: Icon buttons, opacity-0 group-hover:opacity-100
- Empty state: Centered illustration + encouraging message

### Buttons
- Primary CTA: Full bg, white text, py-3, rounded-md
- Secondary: Border style, transparent bg
- Icon buttons: p-2, rounded-full, hover:bg-gray-100
- Loading states: Disabled with spinner

### Input Section (New Todo)
- Prominent at top of dashboard
- Flex layout: input + add button
- Input: flex-1, larger size (py-4)
- Add button: px-6, positioned right

---

## Page-Specific Guidelines

### Login Page
- Centered card on full-height page
- App branding at top
- Email and password fields
- "Remember me" checkbox
- Login button (primary, full-width)
- Link to signup: "Don't have an account? Sign up" (centered, text-sm)
- Forgot password link (subtle, below login button)

### Signup Page
- Identical layout to login
- Email, password, confirm password fields
- Password strength indicator below password field
- Signup button (primary, full-width)
- Link to login: "Already have an account? Log in"
- Terms of service checkbox

### Dashboard
- Header with app name + user menu
- Hero section: Welcome message with user's name (text-2xl, mb-8)
- New todo input (prominent, mb-6)
- Todo list organized by:
  - Active tasks section
  - Completed tasks section (collapsible, with count badge)
- Task count summary: "X active tasks" (text-sm, subtle)
- Each todo row: Checkbox, text, edit icon, delete icon

---

## Images

**Hero Image:** None - Dashboard is content-focused, prioritizes immediate task access

**Empty States:**
- Simple illustration or icon when no todos exist
- Encouraging message: "No tasks yet. Add your first todo above!"
- Positioned center of empty list area

**User Avatar:**
- Small circular avatar in header (if user has profile photo)
- Fallback: Initials in colored circle
- Size: w-8 h-8

---

## Interaction Patterns

- Checkbox toggle: Immediate visual feedback, smooth transition to completed state
- Delete: Slide-out animation (fade + translate)
- Add todo: Smooth insertion at top of active list
- Edit: Inline editing mode with save/cancel buttons
- Loading: Skeleton screens for todo list, spinner for auth

---

## Responsive Behavior

**Mobile (< 768px):**
- Single column layout
- Touch-friendly targets (min 44px height)
- Simplified header (hamburger if needed)
- Full-width buttons and inputs

**Desktop (≥ 768px):**
- Comfortable max-width containers
- Hover states visible
- Keyboard shortcuts displayed (subtle hints)

---

**Key Distinction:** This design prioritizes efficiency and clarity over visual flair. The interface gets out of the user's way, allowing them to focus on their tasks with minimal friction.