<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect('catalogue');
});

Auth::routes();
//afficher page produit
Route::get('/produit', 'ProduitController@afficher');

//afficher page admin
Route::get('/admin', 'AdminController@afficher');
Route::post('/admin', 'AdminController@traitement');

//afficher page reset
Route::get('/reset', 'ResetController@afficher');
Route::post('/reset', 'ResetController@traitement');


//afficher page panier
Route::get('/panier', 'PanierController@afficher');
Route::get('/utilisateur/{utilisateur_id}/panier', 'PanierController@getUserPanier');
Route::get('/utilisateur/{utilisateur_id}/produit/{produit_id}', 'PanierController@addProduit')->name('add.produit');

//afficher page register 
Route::get('/register', 'RegisterController@afficher');
//traitement du formulaire d'inscription jusqu'en base de données
Route::post('/register','RegisterController@traitement');

//afficher page catalogue
Route::get('/catalogue', 'CatalogueController@afficher');
Route::get('/produit/{produit_id}', 'CatalogueController@findProduitById');

//afficher page login 
Route::get('/login', 'LoginController@afficher');
Route::post('/login','LoginController@traitement');

Route::get('/deconnexion', 'CatalogueController@deconnexion');


// Route::view('/', 'welcome');




/*Route::get('/home', 'HomeController@index')->name('home');
Route::get('/', 'HomeController@index')->name('home');
Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');*/
