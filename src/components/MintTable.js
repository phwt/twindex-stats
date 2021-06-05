import { Table } from 'react-bootstrap'

const MintTable = () => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Mint Asset</th>
          <th>Collateral Asset</th>
          <th class="text-center">
            Health
            <i
              class="bi bi-info-circle"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title=""
              data-bs-original-title="Your position could be liquidated if the health reaches 0%"
              aria-label="Your position could be liquidated if the health reaches 0%"
            ></i>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>0.17267 TSLA</td>
          <td>177.82 DOLLY</td>
          <td class="text-center">
            <div class="mint-position-progress progress m-1">
              <div
                class="progress-bar bg-transparent"
                role="progressbar"
                style={{
                  width: '20%',
                }}
              >
                💀
              </div>
              <div
                class="progress-bar bg-transparent"
                role="progressbar"
                style={{
                  width: '51.84%',
                }}
                aria-valuenow="51.84"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                51.84%
              </div>
              <div
                class="progress-bar progress-bar-mask"
                role="progressbar"
                style={{
                  width: '28.159999999999997%',
                }}
              ></div>
            </div>
          </td>
        </tr>
        <tr>
          <td>0.02976 AMZN</td>
          <td>172.07 DOLLY</td>
          <td class="text-center">
            <div class="mint-position-progress progress m-1">
              <div
                class="progress-bar bg-transparent"
                role="progressbar"
                style={{
                  width: '20%',
                }}
              >
                💀
              </div>
              <div
                class="progress-bar bg-transparent"
                role="progressbar"
                style={{
                  width: '60%',
                }}
                aria-valuenow="60.00"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                60.00%
              </div>
              <div
                class="progress-bar progress-bar-mask"
                role="progressbar"
                style={{
                  width: '20%',
                }}
              ></div>
            </div>
          </td>
        </tr>
        <tr
          class="loading"
          style={{
            display: 'none',
          }}
        >
          <td
            colspan="3"
            style={{
              textAlign: 'center',
            }}
          >
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </td>
        </tr>
      </tbody>
    </Table>
  )
}

export default MintTable
