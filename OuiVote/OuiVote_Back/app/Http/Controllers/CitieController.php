<?php

namespace App\Http\Controllers;

use App\Citie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CitieController extends Controller
{
    public function show(Request $request)
    {
        //$citie =Citie::select('citie')->whereColumn('citie');
        //$citie =Citie::All('citie');
        $citie =Citie::All('citie','id');
        return response()->json(['cities'=>$citie],200);
    }

}
