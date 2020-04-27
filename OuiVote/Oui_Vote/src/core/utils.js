export const emailValidator = email => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return "l'Email est vide";
  if (!re.test(email)) return "Ooops! Adresse mail non valide.";
  return '';
};

export const cityValidator = city => {
  if (!city || city.length <= 0) return "la ville est vide";
  return '';
};
export const pieceValidator = piece => {
  if (!piece || piece.length <= 0) return "veuillez sélectionner un fichier";
  return '';
};
export const justifyValidator = justify => {
  if (!justify || justify.length <= 0) return "veuillez sélectionner un justificatif";
  return '';
};

export const passwordValidator = password => {
  if (!password || password.length <= 0) return 'Mot de passe vide.';

  return '';
};

export const nameValidator = name => {
  if (!name || name.length <= 0) return 'Le nom est vide.';
  return '';
};

export const charteValidator = box => {
  if (box == false) return 'veuillez cochez la case';

  return '';
};
