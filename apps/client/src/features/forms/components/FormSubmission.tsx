import React from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const FormSubmission = () => {
    return (
        <section className="flex justify-center p-4 w-72">
            <Table>
                <TableCaption >List of 10 users</TableCaption>
                <TableHeader >
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Age</TableHead>
                        <TableHead>Place</TableHead>
                        <TableHead>Mobile Number</TableHead>
                        <TableHead>Address</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {[
                        { name: "John Doe", email: "john@example.com", age: 28, place: "New York", mobile: "+1 123-456-7890", address: "123 Main St" },
                        { name: "Jane Smith", email: "jane@example.com", age: 32, place: "Los Angeles", mobile: "+1 987-654-3210", address: "456 Elm St" },
                        { name: "Michael Brown", email: "michael@example.com", age: 24, place: "Chicago", mobile: "+1 555-123-4567", address: "789 Oak St" },
                        { name: "Emily Davis", email: "emily@example.com", age: 29, place: "Houston", mobile: "+1 444-987-6543", address: "321 Pine St" },
                        { name: "William Johnson", email: "william@example.com", age: 35, place: "Phoenix", mobile: "+1 222-333-4444", address: "654 Maple St" },
                        { name: "Olivia Wilson", email: "olivia@example.com", age: 27, place: "Philadelphia", mobile: "+1 777-888-9999", address: "987 Cedar St" },
                        { name: "James Martinez", email: "james@example.com", age: 31, place: "San Antonio", mobile: "+1 666-555-4444", address: "159 Spruce St" },
                        { name: "Sophia Garcia", email: "sophia@example.com", age: 26, place: "San Diego", mobile: "+1 111-222-3333", address: "753 Birch St" },
                        { name: "Benjamin Lee", email: "benjamin@example.com", age: 30, place: "Dallas", mobile: "+1 999-888-7777", address: "852 Walnut St" },
                        { name: "Emma Clark", email: "emma@example.com", age: 33, place: "San Jose", mobile: "+1 333-444-5555", address: "951 Chestnut St" },
                    ].map((user, i) => (
                        <TableRow key={i}>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.age}</TableCell>
                            <TableCell>{user.place}</TableCell>
                            <TableCell>{user.mobile}</TableCell>
                            <TableCell>{user.address}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </section>


    )
}

export default FormSubmission