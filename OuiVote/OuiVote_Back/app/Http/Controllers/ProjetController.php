<?php

namespace App\Http\Controllers;

use App\Projet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProjetController extends Controller
{
    public function show()
    {
        $projet =Projet::all('titre', 'description', 'users_id', 'category');
        return response()->json($projet,200);
    }

    // SHOW ONE PROJECT //
    public function showOne(Request $request, $id)
    {
        $showOne = Projet::find($id)->where('id', $id)->first();
        return response()->json($showOne,200);
    }

    // CREATE A NEW PROJECT //
    public function create(Request $request, $id)
    {

        $create = new Projet();
        $create::where('user_id', $id);
        $create->users_id = $id;
        $test = DB::table('users')->where('id', $id)->value('valid');
            if($test == false){
            $create->titre = $request->input('titre');
            $create->description = $request->input('description');
            $create->category = $request->input('category');
            $create->date = $request->input('date');
            $create->hour = $request->input('hour');
            $create->campagne = $request->input('campagne');
            $create->save();
            return response()->json(201);
        } else {
            return response()->json(400);
        }
    }

}
