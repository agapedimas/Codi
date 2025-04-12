import { Metadata } from "next";

const element = (
	"Hello World!"
);

export const metadata: Metadata = 
{
    title: 'Sertifikat'
};

export default function Home() {
	return element;
}
