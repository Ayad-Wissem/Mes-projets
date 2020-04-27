# OuiVote

# Application:

* Application développé React Native et Laravel

* Pour lancer le projet:
- Installer les dépendences: effectuer un `npm install` à la racine du projet et un `pod install` dans le dossier ios puis un `react-native start`.
- Lancer votre serveur en vous rendant dans OuiVote_Back et tapé la commande`php artisan serve` et dans un deuxième terminal toujours dans le même dossier installer les tokens avec `php artisan passport:install --force`.


# A savoir:

* Ce projet avait pour but de réaliser une application de vote avec deux interfaces distinctes entre Maires et Citoyens. Pour pouvoir proposer des projets à sa mairie pour un citoyen et poster des sondages pour les maires.

* Un maire ne peux poster que des sondages et voter.

* Un citoyen ne peux proposer que des projets.

* On ne peux voter qu'une seul fois par sondage.
