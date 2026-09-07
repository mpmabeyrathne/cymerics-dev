FROM node:20

WORKDIR /app

COPY package.json package-lock.json ./

# For clean install
RUN npm ci

#copy application code
COPY . .

#typescript should build
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
