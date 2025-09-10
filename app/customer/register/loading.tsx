import { Spinner } from '@/components/ui/spinner';

export default function Loading() {
    return (
        <div className='w-full h-dvh grid justify-center content-center'>
            <Spinner />
        </div>
    );
}