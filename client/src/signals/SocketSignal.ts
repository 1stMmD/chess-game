import { signal , computed } from "@preact/signals";
import { Socket } from "socket.io-client";

interface socket_type {
    socket : null | Socket,
    pending : boolean,
    error : null | Error
}

const socketSignal = signal<socket_type>({
    socket : null,
    pending : false,
    error : null
});

export const changeSocket = (data : socket_type) => {
    socketSignal.value = data; 
}

export const socket = computed(() => {
    return socketSignal.value.socket
})

export const socket_pending = computed(() => {
    return socketSignal.value.pending
})

export const socket_error = computed(() => {
    return socketSignal.value.error
})