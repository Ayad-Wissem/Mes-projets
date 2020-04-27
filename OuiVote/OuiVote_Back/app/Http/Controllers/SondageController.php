<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Sondage;
use App\User;
use Illuminate\Support\Facades\DB;

class SondageController extends Controller
{
    // SHOW ALL SONDAGES //
    public function show()
    {
        $sondage =Sondage::all('titre', 'description', 'users_id', 'category');
        return response()->json($sondage,200);
    }

    // SHOW ONE SONDAGE //
    public function showOne(Request $request, $id)
    {
        $showOne = Sondage::find($id)->where('id', $id)->first();
        return response()->json($showOne,200);

    }
    //
    public function recupere(Request $request, $id){
        $showOne = Sondage::all('titre', 'description', 'users_id', 'category')->where('users_id', $id);
        return response()->json($showOne,200);
    }

    // CREATE A NEW SONDAGE //
    public function create(Request $request, $id)
    {

        $create = new Sondage();
        $create::where('user_id', $id);
        $create->users_id = $id;
        $test = DB::table('users')->where('id', $id)->value('valid');
        if($test == true){
        $create->titre = $request->input('titre');
        $create->description = $request->input('description');
        $create->category = $request->input('category');
        $create->date = $request->input('date');
        $create->hour = $request->input('hour');
        $create->save();
            return response()->json(201);
        } else {
            return response()->json(400);
        }
    }

    // UPDATE SONDAGE //
    public function update(Request $request, $id, $id2)
    {
        $test = DB::table('sondages')->where('id', $id, true)->value('users_id');
        $test2 = DB::table('users')->where('id', $id2)->value('id');
        if($test == $test2) {
            $update = Sondage::find($id)->where('id',$id)->first();
            $update->titre = $request->input('titre');
            $update->description = $request->input('description');
            $update->category = $request->input('category');
            $update->date = $request->input('date');
            $update->hour = $request->input('hour');
            $update->save();
            return response()->json($update,200);
        } else {
            return response()->json(400);
        }
    }

    // DELETE SONDAGE //
    public function delete(Request $request, $id, $id2)
    {
        $test = DB::table('sondages')->where('id', $id, true)->value('users_id');
        $test2 = DB::table('users')->where('id', $id2)->value('id');
        if($test == $test2) {
        $test = DB::table('sondages')
                ->whereRaw('users_id = ?', [$id2])
                ->whereRaw('id = ?', [$id])
                ->delete();
                return response()->json(200, 400);
        } else {
            return response()->json(400);
        }
    }
}
