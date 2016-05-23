package com.challengeaccepted.controllers;

import com.challengeaccepted.loggers.LoggerUserController;
import com.challengeaccepted.models.ChallengeModel;
import com.challengeaccepted.models.UserModel;
import com.challengeaccepted.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;

import static org.springframework.data.jpa.domain.AbstractPersistable_.id;

@RestController
public class UserController {

    @Autowired
    UserService userService;
    LoggerUserController logger = new LoggerUserController();

    @CrossOrigin
    @RequestMapping(value = "/user/", method = RequestMethod.POST)
    public ResponseEntity<UserModel> createUser(@RequestBody UserModel userModel) {
        userService.saveUserToDatabase(userModel);
        logger.getLogger().log(Level.INFO, "A new user named " + userModel.getFirstName() + " " + userModel.getLastName() + " has been saved to the database");
        return new ResponseEntity<UserModel>(userModel, HttpStatus.CREATED);
    }

    @CrossOrigin
    @RequestMapping(value = "/user/{id}", method = RequestMethod.GET)
    public ResponseEntity<UserModel> readUser(@PathVariable Long id) {
        return new ResponseEntity<UserModel>(userService.getUserFromDatabase(id), HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "/user/", method = RequestMethod.PUT)
    public ResponseEntity updateUser(@RequestBody UserModel userModel) {
        userService.updateUserInDatabase(userModel);
        return new ResponseEntity(HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "/users/", method = RequestMethod.GET)
    public ResponseEntity<ArrayList<UserModel>> readAllUsers() {
        return new ResponseEntity<ArrayList<UserModel>>(userService.getAllUsersFromDatabase(), HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "/user/find-by-email", method = RequestMethod.GET)
    public ResponseEntity<UserModel> readUserByEmail(String email) {
        return new ResponseEntity<UserModel>(userService.getUserByEmailFromDatabase(email), HttpStatus.OK);
    }

}