<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{


    public function index()
    {
        return Todo::latest()->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate(['title' => 'required|string']);
        return Todo::create($data);
    }

    public function update(Request $request, Todo $todo)
    {
        $todo->update(['is_completed' => $request->is_completed]);
        return $todo;
    }

    public function destroy(Todo $todo)
    {
        $todo->delete();
        return response()->noContent();
    }

}
