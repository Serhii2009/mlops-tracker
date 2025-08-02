# MLOps Tracker

A simple experiment tracking dashboard built with React and Vite. This project helps you visualize and compare machine learning experiment metrics through an interactive web interface.

## Live Demo

Check out the live application: https://mlops-tracker.vercel.app/  
🎥 Watch the video presentation: https://drive.google.com/file/d/1kRSjRFJOhIIghEZGmfXNtMTqK7OiUc3i/view?usp=sharing

## What it does

This tool lets you upload CSV files containing your ML experiment data and creates interactive charts to compare different experiments. Think of it as a lightweight alternative to MLflow or Weights & Biases - way easier to set up and get running locally.

## Tech Stack

- **React.js** - Using hooks and functional components
- **Vite** - For fast development and building
- **Recharts** - For the interactive line charts
- **CSS-in-JS** - Inline styles (keeping it simple for now)

## Getting Started

### Prerequisites

You'll need Node.js installed (I've been using version 18, but 16+ should work fine).

### Installation

```bash
# Clone the repo
git clone https://github.com/Serhii2009/mlops-tracker.git
cd mlops-tracker

# Install dependencies
npm install

# Start the dev server
npm run dev
```

## How to Use

1. **Prepare your data**: Your CSV should have columns for experiment ID, metric names, steps, and values
2. **Upload**: Drag and drop your CSV file or click to browse
3. **Select**: Choose which experiments you want to compare using the checkboxes
4. **Visualize**: Pick a metric from the dropdown and see the interactive chart

## Features

- **Drag & drop file upload** - Just drop your CSV right onto the upload area
- **Persistent state** - Your selections are saved in localStorage, so they persist between sessions
- **Multi-experiment comparison** - Select multiple experiments to compare side by side
- **Interactive charts** - Hover over data points to see exact values
- **Responsive design** - Works on different screen sizes

Built with React + Vite
