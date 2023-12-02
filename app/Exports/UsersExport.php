<?php

// namespace App\Exports;

// use Illuminate\Contracts\Support\Responsable;
// use Maatwebsite\Excel\Concerns\FromArray;
// use Maatwebsite\Excel\Concerns\WithHeadings;
// use Maatwebsite\Excel\Concerns\WithMapping;
// // use Maatwebsite\Excel\Concerns\Exportable;
// use Maatwebsite\Excel\Excel;

// class UsersExport implements FromArray, WithHeadings, WithMapping, Responsable
// {
//    	// use Exportable;
//    	protected $data;

//    	private $filename = 'book.xlsx';

//    	private $writerType = EXCEL::XLSX;

//    	private $headers = [
//    		'Content-Type' => 'text/csv',
//    	];

//     public function __construct($data)
//     {
//         $this->data = $data;
//     }

//     // public function collection()
//     // {
//     //     return $this->data;
//     // }

//     // /**
//     //  * @return array
//     //  */
//     // public function headings(): array
//     // {
//     //     $headings = [];
//     //     foreach ( $this->data->toArray() [0] as $key => $value) {
//     //     	$headings[] = User::HEADINGS[$key];
//     //     }
//     //     return $headings;
//     // }

//     /**
//      * @return array
//      */
//     public function array(): array 
//     {
//     	return $this->data->toArray();
//     }

//     public function prepareRows($rows)
//     {
//     	foreach ($rows as $key => $user ) {
//     		$rows[$key]['first_name'] .= ' (prepared) ';
//     	}
//     	return $rows;
//     }

//     /**
//      * @param mixed $row
//      * @return array
//      */
//     public function map($row): array
//     {
//     	return [
//     		$row['id'],
//     		$row['first_name'],
//     		$row['email'],
//     		$row['phone_number'],
//     		$row['address']
//     	];
//     }
// }

