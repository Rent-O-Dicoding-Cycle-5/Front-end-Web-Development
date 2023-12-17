import {userHistoryCard, userHistoryPageHead} from '../template/templateCreator';
import CarDbSource from '../../data/data-source';

const userHistoryPage = {
  async render() {
    return `
        <div id="userHistory"></div>
    `;
  },

  async afterRender() {
    try {
      const userHistoryContainer = document.getElementById('userHistory');
      userHistoryContainer.innerHTML = userHistoryPageHead();

      const orderHistory = await CarDbSource.getOrderHistory();

      const userListContainer = document.getElementById('userHistoryList');
      orderHistory.forEach((rent) => {
        userListContainer.innerHTML += userHistoryCard(rent);
      });
    } catch (error) {
      console.error(error);
    }
  },
};

export default userHistoryPage;
