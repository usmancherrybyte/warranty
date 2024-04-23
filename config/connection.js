import mongoose from "mongoose";

//-----------Connection Function for database-------------
const checkConnection = ( mongoDBURL) => {
    mongoose
        .connect(mongoDBURL)
        .then(() => {
            console.log('App is connected to database');
        })
        .catch((error) => {
            console.log(error);
        });
};

export {checkConnection};
