<template>
<div id="app">
  <img src="../js/logo siview.png" alt="logoSiview" class="logo">
      <vue-particles
        color="#1c5882"
        :particleOpacity="0.7"
        :particlesNumber="80"
        shapeType="circle"
        :particleSize="4"
        linesColor="#1f1f1e"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="repulse"
      >
      </vue-particles>
  <form id="field">
    <md-autocomplete
      v-model="RaisonSoc"
      :md-options="vide"
      md-layout="box"
      required
      md-dense>
      <label>Raison Social</label>
    </md-autocomplete>

    <md-autocomplete
      v-model="Selectcountry"
      :md-options="country"
      md-layout="box"
      required
      md-dense>
      <label>Pays</label>
    </md-autocomplete>

    <md-autocomplete
      v-model="PostalCode"
      @input="CodePostal()"
      :md-options="postcode"
      md-layout="box"
      required
      md-dense>
      <label>Code Postal</label>
    </md-autocomplete>

    <md-autocomplete
      v-model="selectedCities"
      @input="Ville()"
      :md-options="cities"
      md-layout="box"
      required
      md-dense>
      <label>Ville</label>
    </md-autocomplete>

    <md-autocomplete
      v-model="SelectedAdresse"
      @input="onchange()"
      :md-options="Adresse"
      md-layout="box"
      id="Adresse"
      required
      md-dense>
      <label>Adresse</label>
    </md-autocomplete>

    <md-autocomplete
      v-model="Cadresse1"
      :md-options="empty"
      md-layout="box"
      md-dense>
      <label>Complement d'adresse 1</label>
    </md-autocomplete>

    <md-autocomplete
      v-model="Cadresse2"
      :md-options="empty2"
      md-layout="box"
      md-dense>
      <label>Complement d'adresse 2</label>
    </md-autocomplete>

    <input v-on:click="Recap()" class="envoie" type="submit" value="Envoyer">
    <button onClick="window.location.reload();" class="envoie2">Réinitialiser</button>
  </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      RaisonSoc: '',
      Cadresse1: '',
      Cadresse2: '',
      Selectcountry: '',
      SelectedAdresse: '',
      selectedCities: [],
      PostalCode: [],
      country: ['France',
      '-----Europe------',
        'Albanie',
        'Allemagne',
        'Andorre',
        'Autriche',
        'Belgique',
        'Biélorussie',
        'Bosnie-Herzégovine',
        'Bulgarie',
        'Chypre',
        'Croatie',
        'Danemark',
        'Espagne',
        'Estonie',
        'Féroé (îles)',
        'Finlande',
        'Grèce',
        'Groenland',
        'Hongrie',
        'Irlande',
        'Islande',
        'Italie',
        'Jersey-Guernesey',
        'Kosovo', 
        'Lettonie',
        'Liechtenstein',
        'Lituanie',
        'Luxembourg',
        'Macédoine',
        'Malte',
        'Moldavie',
        'Monaco',
        'Monténégro',
        'Norvège',
        'Pays-Bas',
        'Pologne',
        'Portugal',
        'République tchèque',
        'Roumanie',
        'Royaume-Uni',
        'Russie',
        'Saint Marin',
        'Serbie',
        'Slovaquie',
        'Slovénie',
        'Suède',
        'Suisse',
        'Ukraine',
        'Vatican',

        '-----Asie------',
        'Afghanistan',
        'Arabie Saoudite',
        'Arménie',
        'Azerbaïdjan',
        'Bahreïn',
        'Bangladesh',
        'Bhoutan',
        'Brunéi Darussalam',
        'Cambodge',
        'Chine',
        'Chypre',
        'Emirats Arabes Unis',
        'Géorgie',
        'Inde',
        'Indonésie',
        'Iran, République islamique dIraq',
        'Japon',
        'Jordanie',
        'Kazakhstan',
        'Kirghizistan',
        'Koweït',
        'Liban',
        'Malasie',
        'Maldives',
        'Mongolie',
        'Myanmar',
        'Népal',
        'Oman',
        'Ouzbékistan',
        'Pakistan',
        'Philippines',
        'Qatar',
        'République Arabe Syrienne',
        'République de Corée',
        'République démocratique populaire lao',
        'République Populaire Démocratique de Corée',
        'Singapour',
        'Sri Lanka',
        'Tadjikistan',
        'Thaïlande',
        'Turquie',
        'Turkménistan',
        'Viet Nam',
        'Yémen',
        '----Amerique Centrale----',
        'Belize',
        'Costa Rica',
        'Guatemala',
        'Honduras',
        'Nicaragua',
        'Panamá',
        'Salvador',
        '---Amerique du Sud---',
        'Argentine',
        'Bolivie',
        'Brésil',
        'Chili',
        'Colombie',
        'Equateur',
        'Paraguay',
        'Pérou',
        'Suriname',
        'Trinité-et-Tobago',
        'Uruguay',
        'Venezuela',
        '---Amerique du Nord---',
        'Canada',
        'États-Unis',
        'Mexique',
        '--Afrique--',
        'Afrique du Sud',
        'Algérie',
        'Angola',
        'Bénin',
        'Botswana',
        'Burkina Faso',
        'Burundi',
        'Cameroun',
        'Cap Vert',
        'Centrafrique',
        'Comores',
        'Congo',
        'Congo démocratique',
        'Côte dIvoire',
        'Djibouti',
        'Egypte',
        'Erythrée',
        'Ethiopie',
        'Gabon',
        'Gambie',
        'Ghana',
        'Guinée',
        'Guinée Bissau',
        'Guinée équatoriale',
        'Kenya',
        'Lesotho',
        'Liberia',
        'Libye',
        'Madagascar',
        'Malawi',
        'Mali',
        'Maroc',
        'Maurice',
        'Mauritanie',
        'Mozambique',
        'Namibie',
        'Niger',
        'Nigeria',
        'Ouganda',
        'Réunion',
        'Rwanda',
        'Sahara occidental',
        'Sainte Héléne',
        'São Tomé et Príncipe',
        'Sénégal',
        'Seychelles',
        'Sierra Leone',
        'Somalie',
        'Somaliland',
        'Soudan',
        'Swaziland',
        'Tanzanie',
        'Tchad',
        'Togo',
        'Tristan Da Cunha',
        'Tunisie',
        'Zambie',
        'Zimbabwe',
      ],
      Adresse: [],
      cities: [],
      postcode: [],
      vide: [],
      empty: [],
      empty2:[]
    };
  },
  methods: {
    CodePostal: function() {
      if (this.Selectcountry === 'France') {
      axios
          .get(`https://api-adresse.data.gouv.fr/search/?q=`+ encodeURIComponent(this.PostalCode), { mode: "no-cors" })
          .then(res => {
          const fs = res.data.features;
          for ( let i in fs ) {
              this.postcode.push(fs[i].properties.postcode); 
            }
            if (this.PostalCode.value === undefined) {
              this.selectedCities.push(fs[0].properties.name);
            }
        })
      } else {
        return false;
      }
    },
    onchange: function () {
      if (this.Selectcountry === 'France') {
      axios
        .get(`https://api-adresse.data.gouv.fr/search/?q=`+ encodeURIComponent(this.SelectedAdresse) + `&postcode=` + encodeURIComponent(this.PostalCode), { mode: "no-cors" })
        .then(res => {
          const fs = res.data.features;
          for ( let i in fs ) {
              this.Adresse.push(fs[i].properties.label);
            }
        })
      } else {
        return false;
      }
      
    },
    Ville: function() {
      if (this.Selectcountry === 'France') {
      axios
          .get(`https://api-adresse.data.gouv.fr/search/?q=`+ encodeURIComponent(this.selectedCities), { mode: "no-cors" })
          .then(res => {
          const fs = res.data.features;
          for ( let i in fs ) {
              this.cities.push(fs[i].properties.city);
            }
        })
      } else {
        return false;
      }
    },
    Recap: function() {
      if (this.RaisonSoc && this.SelectedAdresse && this.Selectcountry && this.selectedCities && this.PostalCode) {
        alert('Raison sociale: '+ this.RaisonSoc + '\n'+
        'Adresse: ' + this.SelectedAdresse + '\n'+
        'Complément adresse 1: ' + this.Cadresse1 + '\n' +
        'Complément adresse 2: ' + this.Cadresse2 + '\n' +
        'Code postal: ' + this.PostalCode + '\n' +
        'Ville: ' + this.selectedCities + '\n' +
        'Pays: ' + this.Selectcountry
        );
          window.open(`http://maps.google.com/?q=`+ encodeURIComponent(this.SelectedAdresse))
      } else {
        return false;
      }
    },
  }
};
</script>

<style>
 body {
   padding: 0;
   margin: 0;
   background-color: #9ccec4;
 }
 .logo {
   position: absolute;
   left: 39.5%;
   width: 280px;
   height: 280px;
 }

#field {
  width: 350px;
  position: absolute;
  left: 38%;
  top: 21%;
}
.envoie {
  background: none;
  width: 115px;
  height: 35px;
  border: 1px solid black;
  position: absolute;
  margin-top: 2.5%;
  left: 10%;
}
.envoie:hover {
  background-color: #256968;
  color: white;
  cursor: pointer;
  transition: 2s;
  width: 115px;
  height: 35px;
  border: 1px solid black;
  position: absolute;
  margin-top: 2.5%;
  left: 10%;
}
.envoie2{
  background: none;
  width: 115px;
  height: 35px;
  border: 1px solid black;
  position: absolute;
  margin-top: 2.5%;
  left: 54%;
}
.envoie2:hover {
  background-color: #256968;
  color: white;
  transition: 2s;
  cursor: pointer;
  width: 115px;
  height: 35px;
  border: 1px solid black;
  position: absolute;
  margin-top: 2.5%;
  left: 54%;
}
body {
  margin: 0;
  padding: 0;
}
</style>
