//
//  SignUpViewController.swift
//  Restaurant_Advisor_front
//
//  Created by Yanis AYAD on 01/04/2020.
//  Copyright © 2020 Yanis AYAD. All rights reserved.
//

import UIKit

class SignUpViewController: UIViewController {
    
    
    // MARK: Outlets
    @IBOutlet weak var usernameTextField: UITextField!
    @IBOutlet weak var passwordTextField: UITextField!
    @IBOutlet weak var passwordConfirmTextField: UITextField!
    @IBOutlet weak var emailTextField: UITextField!
    @IBOutlet weak var nameTextField: UITextField!
    @IBOutlet weak var firstnameTextField: UITextField!
    @IBOutlet weak var ageTextField: UITextField!
    @IBOutlet weak var signUpButton: UIButton!
    @IBOutlet weak var loginButton: UIButton!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setUpButton()
        setUpTextFieldManager()
    }
    
    
    // MARK: private func
    private func setUpButton() {
        signUpButton.layer.cornerRadius = 20

        loginButton.layer.cornerRadius = 20
        loginButton.layer.borderWidth = 3
        loginButton.layer.borderColor = UIColor.white.cgColor
    }
    
    private func setUpTextFieldManager() {
        usernameTextField.delegate = self
        passwordTextField.delegate = self
        passwordConfirmTextField.delegate = self
        emailTextField.delegate = self
        nameTextField.delegate = self
        firstnameTextField.delegate = self
        ageTextField.delegate = self

        let tapGesture = UITapGestureRecognizer(target: self, action: #selector(hideKeyBoard))
        view.addGestureRecognizer(tapGesture)
    }
        
    private func displayMessage(userMessage:String) -> Void
    {
        DispatchQueue.main.async {
            let alertController = UIAlertController(title: "Alert", message: userMessage, preferredStyle: .alert)
            
            let OKAction = UIAlertAction(title: "OK", style: .default) {
                (action:UIAlertAction!) in
                print("Ok button tapped")
                DispatchQueue.main.async {
                    self.dismiss(animated: true, completion: nil)
                }
            }
            alertController.addAction(OKAction)
            self.present(alertController, animated: true, completion: nil)
        }
    }
    
    private func removeActivityIndicator(activityIndicator: UIActivityIndicatorView)
    {
        DispatchQueue.main.async {
            activityIndicator.stopAnimating()
            activityIndicator.removeFromSuperview()
        }
    }
        
    
    
    // MARK: Actions
    
    @objc private func hideKeyBoard() {
            usernameTextField.resignFirstResponder()
            passwordTextField.resignFirstResponder()
            passwordConfirmTextField.resignFirstResponder()
            emailTextField.resignFirstResponder()
            nameTextField.resignFirstResponder()
            firstnameTextField.resignFirstResponder()
            ageTextField.resignFirstResponder()
        }
    
    @IBAction func signUpButtonPressed(_ sender: UIButton) {
        // make sure all fiels are filled
        if (usernameTextField.text?.isEmpty)! ||
            (passwordTextField.text?.isEmpty)! ||
            (passwordConfirmTextField.text?.isEmpty)! ||
            (emailTextField.text?.isEmpty)! ||
            (nameTextField.text?.isEmpty)! ||
            (firstnameTextField.text?.isEmpty)! ||
            (ageTextField.text?.isEmpty)!
    {
            displayMessage(userMessage: "All fields are required")
                    return
        }
        // verify passwords match
        if ((passwordTextField.text?.elementsEqual(passwordConfirmTextField.text!))! != true) {
            displayMessage(userMessage: "Please make sure that passwords match")
            return
        }
        // create activity indicator
        let myActivityIndicator = UIActivityIndicatorView(style: UIActivityIndicatorView.Style.medium)
        // positioning center
        myActivityIndicator.center = view.center
//        myActivityIndicator.hidesWhenStopped = false
        // Start Activity Indicator
        myActivityIndicator.startAnimating()
        view.addSubview(myActivityIndicator)
        
        // SEND HTTP REQUEST TO REGISTER USER !
        let myUrl = URL(string: "http://127.0.0.1:8000/api/register")
        var request = URLRequest(url: myUrl!)
        request.httpMethod = "POST"
        request.addValue("application/json", forHTTPHeaderField: "content-type")
        request.addValue("application/json", forHTTPHeaderField: "Accept")
        
        let postString =
        [
           "login": usernameTextField.text!,
           "name": nameTextField.text!,
           "firstname": firstnameTextField.text!,
           "email": emailTextField.text!,
           "age": ageTextField.text!,
           "password": passwordTextField.text!,
        ] as [String: String]
//        request.httpBody = postString.data(using: .utf8)
        do {
            request.httpBody = try JSONSerialization.data(withJSONObject: postString, options: .prettyPrinted)
        } catch let error {
            print(error.localizedDescription)
            displayMessage(userMessage: "Something went wrong. Try again.")
            return
        }
        
        let task = URLSession.shared.dataTask(with: request) { (data: Data?, response: URLResponse?, error: Error?) in
            
            self.removeActivityIndicator(activityIndicator: myActivityIndicator)
            
            if error != nil {
                self.displayMessage(userMessage: "eCould not successfully perform. Please try again later")
                print("error=\(String(describing: error))")
                return
            }
            let json: String = String(data: data!, encoding: .utf8)!
            print(json)
            
            self.displayMessage(userMessage: "Successfully Registered a New Account. Please Proceed  to Sign in")
        }
            
            task.resume()
    }
  
    @IBAction func loginButtonPressed(_ sender: UIButton) {
        let logInViewController =
            self.storyboard?.instantiateViewController(identifier: "ConnexionController") as! ConnexionController
        self.present(logInViewController, animated: true)
    }
}

extension SignUpViewController: UITextFieldDelegate {
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        textField.resignFirstResponder()
        return true
    }
}



