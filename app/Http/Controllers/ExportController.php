<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
// use App\Exports\UsersExport;

use App\Models\BookAppointment;
use App\Http\Resources\BookReportResource;


class ExportController extends Controller
{
    // public function report(Request $request) {
    //     $data = BookReportResource::collection($this->appointmentList());

    //     // return Excel::download(new ReportsExport($data), 'records.xlsx');
    //     // return (new UsersExport($records));
    //     // return Excel::download(new DataExport($data), $filename);

    //     return $data;
    // }

    // public function export()
    // {
    //     $data = $this->appointmentList();

    //     $csv = Writer::createFromString('');
    //     $csv->insert(array('Name', 'Email'));

    //     foreach ($data as $row) {
    //         $csv->insert(array($row->first_name, $row->email));
    //     }

    //     return response($csv->getContent())
    //         ->header('Content-Type', 'text/csv')
    //         ->header('Content-Disposition', 'attachment; filename="export.csv"');
    // }

    public function downloadCSV() {
        // Fetch specific columns from the database
        $data = $this->appointmentList();

        // Get the current date
        $currentDate = date('Y-m-d'); // Or any other format you prefer

        // Generate a filename with the current date
        $filename = "book_data_{$currentDate}.csv";

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => "attachment; filename=\"{$filename}\"",
        ];

        $customColumnNames = [
            'first_name' => 'Name',
            'email' => 'Email',
            'phone_number' => 'Phone',
        ];

        $callback = function() use ($data, $customColumnNames) {
            $file = fopen('php://output', 'w');

            // Add headers with custom column names
            fputcsv($file, array_values($customColumnNames));

            // Add data with specific columns
            foreach ($data as $row) {
                $rowData = [];
                foreach ($customColumnNames as $column => $customName) {
                    $rowData[] = $row->{$column};
                }
                fputcsv($file, $rowData);
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }


    //  public function exportExcel(Request $request)
    // {
    //      $model = $this->makeModel($request);
    //     $users = $model::select('id', 'first_name', 'last_name', 'email', 'created_at', 'updated_at')->get();
    //     return Excel::download(new UsersExport($users), $request->model.'-users.xlsx');
    // }

    // public function exportExcel2(Request $request){
    //     // Open the file
    //     // Usage
    //     $sheet = $event->sheet;
    //     setColumnWidth($sheet, 'A', 20);
    //     setColumnWidth($sheet, 'B', 30);
    //     setColumnWidth($sheet, 'C', 40);
    // }

    // public function downloadPDF(Request $request)
    // {
    //     $model = $this->makeModel($request);
    //     $records = $model::all(); // Fetch all records from the database
    //     $data = [
    //         'title' => ucfirst($request->model).' Records',
    //         'records' => $records,
    //     ];

    //     $pdf = PDF::loadView('admin.includes.user-record', $data);
    //     return $pdf->download($request->model.'-records.pdf');
    // }

    // private function makeModel(Request $request){
    //     $model = "App\\Models\\".ucfirst($request->model);
    //     return $model;
    // }

    private function appointmentList() {
        $book = BookAppointment::query()
            ->join('users', 'book_appointments.user_id', '=', 'users.id')
            ->join('work_hours', 'book_appointments.time_id', '=', 'work_hours.id')
            ->orderBy('created_at', 'DESC')
            ->get([
                'book_appointments.*',
                'users.image_url',
                'work_hours.start_time',
                'work_hours.end_time',
            ]);
        return $book;
    }
}



