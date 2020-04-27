<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class VoteController extends Controller
{
    public function getVoteByUserId($id)
    {
        $user = \App\User::find($id)->votes();
        return response()->json($user,200);
    }
}
