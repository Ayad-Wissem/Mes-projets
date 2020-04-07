//
//  ViewController.swift
//  Restaurant_Advisor_front
//
//  Created by Yanis AYAD on 30/03/2020.
//  Copyright © 2020 Yanis AYAD. All rights reserved.
//

import UIKit

class ConnexionController: UIViewController {

    
    // MARK: Outlet
    @IBOutlet weak var loginButton: UIButton!
    @IBOutlet weak var guestButton: UIButton!
    @IBOutlet weak var usernameTextField: UITextField!
    @IBOutlet weak var passwordTextField: UITextField!
    @IBOutlet weak var ignoreButton: UIButton!
    

    
    // MARK: Properties
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setUpButton()
        setUpTextFieldManager()
        
    }

    // MARK: private functions
    
    private func setUpButton() {
        loginButton.layer.cornerRadius = 20

        guestButton.layer.cornerRadius = 20
        guestButton.layer.borderWidth = 3
        guestButton.layer.borderColor = UIColor.white.cgColor
        
        ignoreButton.layer.cornerRadius = 20
    }
    
    private func setUpTextFieldManager() {
        usernameTextField.delegate = self
        passwordTextField.delegate = self

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
    }
    @IBAction func loginButtonPressed(_ sender: UIButton) {
       
        // Read value from text fields
        let username = usernameTextField.text
        let password = passwordTextField.text
        
        // Check if fields are not empty
        if (username?.isEmpty)! || (password?.isEmpty)! {
            
            //display alert message
            print("User name \(String(describing: username)) or password \(String(describing: password)) is empty")
            displayMessage(userMessage: "One of the required field is missing")
            return
        }
    
                // create activity indicator
                let myActivityIndicator = UIActivityIndicatorView(style: UIActivityIndicatorView.Style.medium)
                // positioning center
                myActivityIndicator.center = view.center
                // myActivityIndicator.hidesWhenStopped = false
                // Start Activity Indicator
                myActivityIndicator.startAnimating()
                view.addSubview(myActivityIndicator)
        
        let myUrl = URL(string: "http://127.0.0.1:8000/api/auth")
        var request = URLRequest(url: myUrl!)
        
        request.httpMethod = "POST"
        request.addValue("application/json", forHTTPHeaderField: "content-type")
        request.addValue("application/json", forHTTPHeaderField: "Accept")
        
        let postString =
            [
                "login": username!,
                "password": password!,
            ] as [String: String]
        
        do {
            request.httpBody = try JSONSerialization.data(withJSONObject: postString, options: .prettyPrinted)
        } catch let error {
            print(error.localizedDescription)
            displayMessage(userMessage: "Something went wrong...")
            return
        }
        
        let task = URLSession.shared.dataTask(with: request) { (data: Data?, response: URLResponse?, error: Error?) in
            
            self.removeActivityIndicator(activityIndicator: myActivityIndicator)
            if error != nil
            {
                self.displayMessage(userMessage: "1.Could not successfully perform this request. Please try again later")
                print("error=\(String(describing: error))")
                return
            }
       
            let json: String = String(data: data!, encoding: .utf8)!
            print(json)
            if json != "200" {
                self.displayMessage(userMessage: "Account or Password incorrect, please retry.")
            } else {
                    DispatchQueue.main.async {
                        
                        self.performSegue(withIdentifier: "goToHome", sender: self)
//                    let restaurantViewController =
//                        self.storyboard?.instantiateViewController(identifier: "ListRestaurantTableViewController") as! ListRestaurantTableViewController
//                    self.present(restaurantViewController, animated: true)
                }
            }
            
        }
        task.resume()
    }
    
    @IBAction func guestButtonPressed(_ sender: UIButton) {
        let restaurantViewController =
            self.storyboard?.instantiateViewController(identifier: "SignUpViewController") as! SignUpViewController
            self.present(restaurantViewController, animated: true)
    }
    
    @IBAction func ignoreButtonPressed(_ sender: Any) {
        self.performSegue(withIdentifier: "goToHome", sender: self)
    }
    
}

extension ConnexionController: UITextFieldDelegate {
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        textField.resignFirstResponder()
        return true
    }
}

