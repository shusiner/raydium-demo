import { connection } from '../config'

export default async function waitForTx(sig: string, waitTime: number) {
  let isWaitTimeExceeded = false
  const startTime = performance.now()
  let endTime = performance.now()
  let elapsedTime = endTime - startTime
  let sig3 = await connection.getParsedTransaction(sig, { maxSupportedTransactionVersion: 0 })
  while (!sig3 && !isWaitTimeExceeded) {
    isWaitTimeExceeded = performance.now() - startTime < waitTime ? false : true
    endTime = performance.now()
    elapsedTime = endTime - startTime
    console.log('Waiting for 1 second...', { elapsedTime })
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log('Checking...')
    sig3 = await connection.getParsedTransaction(sig, { maxSupportedTransactionVersion: 0 })
  }
  endTime = performance.now()
  elapsedTime = endTime - startTime
  console.log('Time taken:', elapsedTime, 'milliseconds')
  console.log({ sig3, isWaitTimeExceeded })
  return { sig3, isWaitTimeExceeded }
}
