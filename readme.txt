# Super Cool Betting Club Dashboard

An interactive dashboard for tracking sports betting performance among a group of friends.

## Features

- League standings table showing current points and rankings
- Points progression over time with interactive charts
- Player performance statistics and bet type analysis
- Win rate visualization by bet type
- Recent betting history

## Prerequisites

- Node.js 14.x or higher
- npm 6.x or higher

## Local Development

1. Clone this repository:
```
git clone https://github.com/jab1986/scbc.git
cd scbc
```

2. Install dependencies:
```
npm install
```

3. Start the development server:
```
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Deployment to Digital Ocean

### Option 1: Using Digital Ocean App Platform (Recommended)

1. Create a [Digital Ocean account](https://cloud.digitalocean.com/registrations/new)

2. Push this code to a GitHub repository:
```
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/jab1986/scbc.git
git push -u origin main
```

3. In the Digital Ocean dashboard:
   - Click "Apps" in the left sidebar
   - Click "Create App"
   - Select your GitHub repository
   - Select "Web Service" as resource type
   - Keep the default settings (Digital Ocean should auto-detect Node.js)
   - Select a plan (Basic/Starter plan is sufficient)
   - Click "Next" and then "Create Resources"

4. Digital Ocean will automatically build and deploy your app, providing you with a URL

### Option 2: Using a Digital Ocean Droplet

1. Create a Droplet with Ubuntu in the Digital Ocean dashboard

2. Connect to your Droplet via SSH:
```
ssh root@your-droplet-ip
```

3. Install dependencies:
```
apt update && apt upgrade -y
apt install -y nodejs npm nginx
```

4. Clone your repository:
```
git clone https://github.com/jab1986/scbc.git
cd scbc
```

5. Build the app:
```
npm install
npm run build
```

6. Configure Nginx:
```
nano /etc/nginx/sites-available/default
```

Replace the content with:
```
server {
    listen 80;
    server_name your-droplet-ip;
    root /root/betting-dashboard/build;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

7. Restart Nginx:
```
systemctl restart nginx
```

8. Visit your site at `http://your-droplet-ip`

## Updating Your Dashboard

### For App Platform

1. Make your changes locally
2. Commit and push to GitHub:
```
git add .
git commit -m "Update dashboard"
git push
```
3. Digital Ocean will automatically rebuild and deploy

### For Droplet

1. SSH into your Droplet
2. Pull the latest changes:
```
cd betting-dashboard
git pull
npm install
npm run build
```

## Adding a Custom Domain

### For App Platform

1. In your app's settings, go to the "Domains" tab
2. Click "Add Domain"
3. Follow the instructions to configure your domain

### For Droplet

1. Update your Nginx configuration:
```
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    ...
}
```

2. Install Certbot for SSL:
```
apt install certbot python3-certbot-nginx
certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## Customizing the Dashboard

- Edit `src/App.js` to modify the dashboard layout and features
- Update the sample data in the `sampleData` object to reflect your actual betting data
- Create an API endpoint to fetch real-time data and update the `fetchData` function

## License

MIT
