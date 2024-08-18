import { useCallback, useEffect, useState } from "react";

import "../styles/blockchain.css";

interface Transaction {
  inputs: {
    prev_out: {
      addr: string;
      value: number;
    };
  }[];
  out: {
    addr: string;
  }[];
}

const Blockchain = () => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const start = () => {
    const socket = new WebSocket("wss://ws.blockchain.info/inv");

    socket.onopen = () => {
      socket.send('{"op":"unconfirmed_sub"}');
    };

    socket.onmessage = (event) => {
      const transaction = JSON.parse(event.data);
      setTransactions((prevTransactions) => [
        ...prevTransactions,
        transaction.x,
      ]);
      setTotalPrice(
        (prevTotal) => prevTotal + transaction.x.inputs[0].prev_out.value
      );
    };

    setWs(socket);
  };

  const stop = useCallback(() => {
    if (ws) {
      ws.close();
    }
  }, [ws]);

  const reset = () => {
    setTransactions([]);
    setTotalPrice(0);
  };

  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);
  return (
    <div className="blockchain">
      <h1>Blockchain</h1>
      <div className="blockchain__buttons">
        <button
          className="blockchain__button button--green"
          onClick={start}
        >
          Start
        </button>
        <button
          className="blockchain__button button--red"
          onClick={stop}
        >
          Stop
        </button>
        <button
          className="blockchain__button button--yellow"
          onClick={reset}
        >
          Reset
        </button>
      </div>
      <p>Total price: {totalPrice / 100000000} BTC</p>
      <table className="blockchain__table">
        <thead>
          <tr className="blockchain__table-header">
            <th>From</th>
            <th>To</th>
            <th>Sum</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index} className="blockchain__table-row">
              <td>
                {transaction.inputs[0].prev_out.addr}
              </td>
              <td>
                {transaction.out[0].addr}
              </td>
              <td>
                {transaction.inputs[0].prev_out.value / 100000000} BTC
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Blockchain;