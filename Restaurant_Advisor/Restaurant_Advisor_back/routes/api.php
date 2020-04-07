<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Restaurant;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

 
Route::get('/restaurants', 'RestaurantsController@index');
Route::get('/restaurant/{id}', 'RestaurantsController@show');
Route::post('/restaurant', 'RestaurantsController@store');
Route::put('/restaurant/{id}', 'RestaurantsController@update');
Route::delete('/restaurant/{id}', 'RestaurantsController@delete');

 
Route::get('/restaurant/{id}/menus', 'MenuController@show');
Route::post('/restaurant/{id}/menu', 'MenuController@store');
Route::put('/restaurant/{id}/menu/{id2}', 'MenuController@update');
Route::delete('/restaurant/{id}/menu/{id2}','MenuController@delete');

Route::post('/register', 'UserController@register');
Route::post('/auth', 'UserController@auth');
Route::get('/users', 'UserController@show');

