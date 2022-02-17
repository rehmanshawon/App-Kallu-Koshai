import axios from "axios";
import styles from "../../styles/Order.module.css";
import Image from "next/image";
import useSWR from "swr";
import { useRouter } from "next/router";
const fetcher = (...args) => fetch(...args).then((res) => res.json());
const Order = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR(`/api/orders/${id}`, fetcher, {
    refreshInterval: 1000,
  });
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  console.log(id);
  const status = data.status;
  // `http://localhost:3000/api/orders/${params.id}`;
  const statusClass = (index) => {
    if (index - status < 1) return styles.done;
    if (index - status === 1) return styles.inProgress;
    if (index - status > 1) return styles.undone;
  };
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.row}>
          <table className={styles.table}>
            <tr className={styles.trTitle}>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Address</th>
              <th>Total</th>
            </tr>
            <tr className={styles.tr}>
              <td>
                <span className={styles.id}>{data._id} </span>
              </td>
              <td>
                <span className={styles.name}>{data.customer} </span>
              </td>
              <td>
                <span className={styles.address}>{data.address}</span>
              </td>
              <td>
                <span className={styles.total}>Tk.{data.total}</span>
              </td>
            </tr>
          </table>
          <div className={styles.row}>
            <table className={styles.table}>
              <tr className={styles.trTitle}>
                <th>Product Name</th>
                <th>Descriptiion</th>
                <th>Price</th>
                <th>Qty</th>
              </tr>
              {data.productsOrdered.map((product, index) => (
                <tr className={styles.tr} key={index}>
                  <td>
                    <span className={styles.id}>{product.title} </span>
                  </td>
                  <td>
                    <span className={styles.id}>{product.desc} </span>
                  </td>
                  <td>
                    <span className={styles.id}>{product.price} </span>
                  </td>
                  <td>
                    <span className={styles.id}>{product.qty} </span>
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </div>
        <div className={styles.row}>
          <div className={statusClass(0)}>
            <Image src="/images/paid.png" width={30} height={30} alt="" />
            <span>Payment</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                src="/images/checked.png"
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
          <div className={statusClass(1)}>
            <Image src="/images/bake.png" width={30} height={30} alt="" />
            <span>Preparing</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                src="/images/checked.png"
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
          <div className={statusClass(2)}>
            <Image src="/images/bike.png" width={30} height={30} alt="" />
            <span>On the way</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                src="/images/checked.png"
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
          <div className={statusClass(3)}>
            <Image src="/images/delivered.png" width={30} height={30} alt="" />
            <span>Delivered</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                src="/images/checked.png"
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>Tk.{data.total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>0.00 /=
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>Tk.{data.total}
          </div>
          <button disabled className={styles.button}>
            PAID
          </button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(`http://localhost:3000/api/orders/${params.id}`);
  return {
    props: { order: res.data },
  };
};
export default Order;
