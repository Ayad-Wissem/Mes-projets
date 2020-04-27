<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\User;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', 'UserController@user');

// Connexion
Route::post('login', 'UserController@login');
//Inscription
Route::post('register', 'UserController@register');
// Deconnexion
Route::post('logout', 'UserController@logout');
//Authentification
Route::group(['middleware' => 'auth:api'], function(){
    Route::post('details', 'UserController@details');
});

// Show all cities
Route::get('/cities', 'CitieController@show');
// Show all sondages
Route::get('/sondages', 'SondageController@show');
// Show all projets
Route::get('/projets', 'ProjetController@show');
// Show one sondage
Route::get('/sondages/{id}', 'SondageController@showOne');
// Show one projet
Route::get('/projet/{id}', 'ProjetController@showOne');
// Get ALL sondages from user
Route::get('/user/{id}/sondages', 'SondageController@recupere');

//Modify an user field
Route::put('/user/{id}', 'UserController@modify');
// Get an user => User page
Route::get('/getuser/{id}', 'UserController@getUser');
// Create a sondage only POSSIBLE IF valid = 1 => maire
Route::post('/user/{id}/sondage', 'SondageController@create');
// Update a sondage Only possible for his creator
Route::put('/user/{id2}/sondages/{id}', 'SondageController@update');
// Delete a sondage Only possible for his creator
Route::delete('/user/{id2}/sondages/{id}', 'SondageController@delete');

// Create a projet only POSSIBLE IF valid = 0 => user
Route::post('/user/{id}/projet', 'ProjetController@create');




Route::get('/toto/{id}', 'VoteController@getVoteByUserId');





