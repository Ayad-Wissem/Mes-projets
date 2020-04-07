<?php

namespace App\Http\Controllers;

use App\Menu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MenuController extends Controller
{
    public function show($id)
    {
        $menu=menu::where('restaurants_id',$id)->get();
        return response()->json($menu,200);
    }

    public function store(Request $request, $id)
    {
        $store = new menu();
        $store::where('restaurants_id',$id);
        $store->restaurants_id = $id;
        $store->name = $request->input('name');
        $store->description = $request->input('description');
        $store->price = $request->input('price');
        $store->save();
        return response()->json(201, 400);
    }

    public function update($id,$id2,Request $request) {
        $menu = menu::find($id2)->where('restaurants_id',$id)->first();
        $menu->name = $request->input('name');
        $menu->description = $request->input('description');
        $menu->price = $request->input('price');
        $menu->save();

        return response()->json($menu,200);
    }

    public function delete($id,$id2) 
    {
        $menu = DB::table('menus')
                ->whereRaw('restaurants_id = ?', [$id])
                ->whereRaw('id = ?', [$id2])
                ->delete();
                
        return response()->json(200, 400);
    }
}