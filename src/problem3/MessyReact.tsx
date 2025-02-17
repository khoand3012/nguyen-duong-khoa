// @ts-nocheck

interface WalletBalance {
  currency: string;
  amount: number;
  // Added missing blockchain property
  blockchain: string;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {}

const priority = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  // const getPriority = (blockchain: any): number => {
  //   switch (blockchain) {
  //     case "Osmosis":
  //       return 100;
  //     case "Ethereum":
  //       return 50;
  //     case "Arbitrum":
  //       return 30;
  //     case "Zilliqa":
  //       return 20;
  //     case "Neo":
  //       return 20;
  //     default:
  //       return -99;
  //   }
  // };

  // Change getPriority from a switch case statement to a hashmap to improve speed
  const getPriority = (blockchain: any): number => {
    return priority[blockchain] || -99;
  };

  const sortedBalances = useMemo(() => {
    return (
      balances
        // .filter((balance: WalletBalance) => {
        //   const balancePriority = getPriority(balance.blockchain);
        //   if (lhsPriority > -99) {
        //     if (balance.amount <= 0) {
        //       return true;
        //     }
        //   }
        //   return false;
        // })
        // lhsPriority is undefined, so I changed it to balancePriority.
        // The filter seems to keep only zero/negative balances, so I changed it to only keep positive balances.
        .filter((balance: WalletBalance) => {
          const balancePriority = getPriority(balance.blockchain);
          return balancePriority > -99 && balance.amount > 0;
        })
        .sort((lhs: WalletBalance, rhs: WalletBalance) => {
          const leftPriority = getPriority(lhs.blockchain);
          const rightPriority = getPriority(rhs.blockchain);
          // if (leftPriority > rightPriority) {
          //   return -1;
          // } else if (rightPriority > leftPriority) {
          //   return 1;
          // }
          // Shorten code, as sort function only needs to check if it returns positive or negative number.
          return rightPriority - leftPriority;
        })
    );
  // }, [balances, prices]);
  // Remove unused dependency
  }, [balances]);

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      // formatted: balance.amount.toFixed(),
      // Added decimal place for better formatting
      formatted: balance.amount.toFixed(2),
    };
  });

  const rows = sortedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          className={classes.row}
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    }
  );

  return <div {...rest}>{rows}</div>;
};
