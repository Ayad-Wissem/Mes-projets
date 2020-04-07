<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Restaurant;

class RestaurantsController extends Controller
{

    public function index()
    {
        $restaurant = Restaurant::all('id','name','description','grade','localization','phone_number','website','hours');
        return response()->json($restaurant, 200);
    }
 
    public function show($id)
    {
        $restaurant = Restaurant::find($id);
        return response()->json($restaurant, 200);
    }

    public function store(Request $request)
    {
        $restaurant = Restaurant::create($request->all());  
        return response()->json($restaurant, 201);
    }

    public function update(Request $request, $id)
    {
        $id->update($request->all());

       return response()->json($id, 200);
    }

    public function delete($id)
    {
        $id->delete();

        return response()->json(null, 204);
    }
}
