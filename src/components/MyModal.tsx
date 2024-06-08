import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
interface Props {
  title: string,
  open: boolean,
  onClose: (value: boolean) => void
  backdrop: boolean,
  children?: React.ReactNode; // 新增 children prop
}
export default function MyModal({ title, open, onClose, backdrop, children }: Props) {
  return (
    <Transition appear show={open}>
      <Dialog as="div" className="relative z-10 focus:outline-none" onClose={onClose}>
        {
          backdrop &&
          <div className="fixed inset-0 bg-black/80" aria-hidden="true" />
        }
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 transform-[scale(95%)]"
              enterTo="opacity-100 transform-[scale(100%)]"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 transform-[scale(100%)]"
              leaveTo="opacity-0 transform-[scale(95%)]"
            >
              <DialogPanel className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl">
                <DialogTitle as="h3" className="text-base/7 font-medium text-red-200">
                  {title}
                </DialogTitle>
                <p className="mt-2 text-sm/6 text-white/50">
                  {
                    children && children
                  }
                </p>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}