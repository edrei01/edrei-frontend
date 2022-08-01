FROM node:16

# set working directory
WORKDIR /app_rest

# install app dependencies
COPY package*.json ./
RUN npm install 

# add app
COPY . ./

EXPOSE 80:3000

# start app
CMD ["npm", "run", "start"]