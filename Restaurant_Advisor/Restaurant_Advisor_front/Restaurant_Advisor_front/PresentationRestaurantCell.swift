//
//  PresentationRestaurantCell.swift
//  Restaurant_Advisor_front
//
//  Created by Yanis AYAD on 04/04/2020.
//  Copyright © 2020 Yanis AYAD. All rights reserved.
//

import UIKit

class PresentationRestaurantCell: UITableViewCell {

    // MARK: OUTLETS

    @IBOutlet weak var nameLabel: UILabel!
    @IBOutlet weak var descriLabel: UILabel!
    @IBOutlet weak var locaLabel: UILabel!
    @IBOutlet weak var gradeLabel: UILabel!
    @IBOutlet weak var websiteLabel: UILabel!
    @IBOutlet weak var hoursLabel: UILabel!
    @IBOutlet weak var phoneLabel: UILabel!
    
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }

}
