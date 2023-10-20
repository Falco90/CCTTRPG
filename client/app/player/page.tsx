import Image from 'next/image'

export default function PlayerPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div><h1>Player Page</h1></div>
            <button>Create character</button>
            <button>Do ability check</button>
            <button>Decrypt File</button>

        </main>
    )
}
